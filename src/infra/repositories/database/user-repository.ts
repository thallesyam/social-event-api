import { User } from '@/domain/entities'
import { UserAlreadyRegister } from '@/domain/errors'
import { UserNotFound, UserIdNotFound } from '@/domain/errors'
import { UserRepository } from '@/domain/repositories'
import { PrismaClient } from '@prisma/client'

export class UserRepositoryDatabase implements UserRepository {
  constructor(readonly prisma: PrismaClient) {}

  async follow(from: User, to: User): Promise<void> {
    const canUnfollow = await this.prisma.user.findUnique({
      where: { email: to.email },
      include: {
        following: { where: { followerId: from.userId } }
      }
    })

    if (canUnfollow?.following.length !== 0) {
      await this.prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: from.userId,
            followingId: to.userId
          }
        }
      })

      return
    } else {
      await this.prisma.follows.create({
        data: {
          followerId: from.userId,
          followingId: to.userId
        }
      })
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    return users as unknown as User[]
  }

  async findOneById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      include: { followers: true, following: true, subscriptions: true }
    })
    if (!user) throw new UserIdNotFound()
    return user as unknown as User
  }

  async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.prisma.user.findMany({
      where: { email, password },
      include: { followers: true, following: true, subscriptions: true }
    })
    if (!user) throw new UserNotFound()
    return user as unknown as User
  }

  async save(user: User): Promise<void> {
    const hasUserWithSameEmail = await this.prisma.user.findUnique({
      where: { email: user.email }
    })
    if (hasUserWithSameEmail) throw new UserAlreadyRegister()
    const data = {
      ...user
    }
    delete data.followers
    delete data.following
    await this.prisma.user.create({ data })
  }
}

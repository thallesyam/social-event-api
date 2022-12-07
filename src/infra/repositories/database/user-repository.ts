import { User } from '@/domain/entities'
import { UserAlreadyRegister } from '@/domain/errors'
import { UserNotFound, UserIdNotFound } from '@/domain/errors'
import { UserRepository } from '@/domain/repositories'
import { PrismaClient } from '@prisma/client'

export class UserRepositoryDatabase implements UserRepository {
  constructor(readonly prisma: PrismaClient) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    return users as unknown as User[]
  }

  async findOneById(userId: string): Promise<User> {
    const user = await this.prisma.user.findMany({ where: { userId } })
    if (!user) throw new UserIdNotFound()
    return user as unknown as User
  }

  async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.prisma.user.findMany({ where: { email, password } })
    if (!user) throw new UserNotFound()
    return user as unknown as User
  }

  async save(user: User): Promise<void> {
    const hasUserWithSameEmail = await this.prisma.user.findUnique({
      where: { email: user.email }
    })
    if (hasUserWithSameEmail) throw new UserAlreadyRegister()
    await this.prisma.user.create({ data: user })
  }
}

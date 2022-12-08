import { User } from '@/domain/entities'
import { UserAlreadyRegister } from '@/domain/errors'
import { UserNotFound, UserIdNotFound } from '@/domain/errors'
import { UserRepository } from '@/domain/repositories'

export class UserRepositoryMemory implements UserRepository {
  private users: User[] = []

  constructor() {}

  async findAll(): Promise<User[]> {
    return this.users
  }

  async findOneById(userId: string): Promise<User> {
    const user = this.users.find((user) => user.userId === userId)
    if (!user) throw new UserIdNotFound()
    return user
  }

  async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    )
    if (!user) throw new UserNotFound()
    return user
  }

  async save(user: User): Promise<void> {
    const hasUserWithSameEmail = this.users.find(
      (data) => data.email === user.email
    )
    if (hasUserWithSameEmail) throw new UserAlreadyRegister()
    this.users.push(user)
  }

  async follow(from: User, to: User): Promise<void> {
    const canUnfollow = from.followers.find(
      (item: User) => item.userId === to.userId
    )

    if (canUnfollow) {
      this.users = this.users.map((user) => {
        if (user.userId === from.userId) {
          return {
            ...user,
            followers: user.followers.filter(
              (fol: User) => fol.userId !== to.userId
            )
          }
        }

        if (user.userId === to.userId) {
          return {
            ...user,
            following: user.following.filter(
              (fol: User) => fol.userId !== from.userId
            )
          }
        }

        return user
      }) as any

      return
    }

    from.followers.push(to)
    to.following.push(from)
  }
}

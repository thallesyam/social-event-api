import { User } from '@/domain/entities'
import { UserAlreadyRegister } from '@/domain/errors'
import { UserNotFound } from '@/domain/errors'
import { UserRepository } from '@/domain/repositories'

export class UsersRepositoryMemory implements UserRepository {
  users: User[] = []

  constructor() {}

  async findAll(): Promise<User[]> {
    return this.users
  }

  async findOneById(userId: string): Promise<User | undefined> {
    return this.users.find((user) => user.userId === userId)
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
}

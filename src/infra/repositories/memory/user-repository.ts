import { User } from '@/domain/entities'
import { UserRepository } from '@/domain/repositories'

export class UsersRepositoryMemory implements UserRepository {
  users: User[] = []

  constructor() {}

  async findAll(): Promise<User[]> {
    return this.users
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}

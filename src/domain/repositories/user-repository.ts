import { User } from '../entities'

export interface UserRepository {
  findAll(): Promise<User[]>
  findOne(userId: string): Promise<User | undefined>
  save(user: User): Promise<void>
}

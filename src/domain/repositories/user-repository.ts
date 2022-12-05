import { User } from '../entities'

export interface UserRepository {
  findAll(): Promise<User[]>
  findOneById(userId: string): Promise<User | undefined>
  findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined>
  save(user: User): Promise<void>
}

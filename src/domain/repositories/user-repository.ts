import { User } from '@/domain/entities'

export interface UserRepository {
  findAll(): Promise<User[]>
  findOneById(userId: string): Promise<User>
  findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined>
  save(user: User): Promise<void>
  follow(from: User, to: User): Promise<void>
}

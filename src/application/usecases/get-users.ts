import { UserRepository } from '@/domain/repositories'
import { User } from '@/domain/entities'

export class GetUsers {
  constructor(readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll()
    return users
  }
}

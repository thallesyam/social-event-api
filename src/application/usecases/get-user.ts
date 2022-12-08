import { UserRepository } from '@/domain/repositories'
import { User } from '@/domain/entities'

export class GetUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<User> {
    const user = await this.userRepository.findOneById(input.userId)
    return user
  }
}

type Input = {
  userId: string
}

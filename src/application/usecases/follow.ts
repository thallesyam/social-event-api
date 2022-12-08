import { UserRepository } from '@/domain/repositories'

export class Follow {
  constructor(readonly usersRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const fromUser = await this.usersRepository.findOneById(input.from)
    const toUser = await this.usersRepository.findOneById(input.to)
    await this.usersRepository.follow(fromUser, toUser)
  }
}

type Input = {
  from: string
  to: string
}

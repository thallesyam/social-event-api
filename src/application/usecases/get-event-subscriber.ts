import { User } from '@/domain/entities'
import { UserRepository } from '@/domain/repositories'

export class GetEventSubscriber {
  constructor(readonly usersRepository: UserRepository) {}

  async execute(input: Input): Promise<User[]> {
    const users = await Promise.all(
      input.subscriptions.map(async (sub) => {
        const user = await this.usersRepository.findOneById(sub)
        return user
      })
    )
    return users
  }
}

type Input = {
  subscriptions: string[]
}

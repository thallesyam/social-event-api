import { UserRepository } from '@/domain/repositories'

export class UserUpdate {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const user = (await this.userRepository.findOneById(input.userId)) as any

    delete user.followers
    delete user.following

    if (user.subscriptions) {
      delete user.subscriptions
    }

    const data = {
      ...user,
      ...input.updateData
    }
    await this.userRepository.updateUser(user.userId, data)
  }
}

type Input = {
  userId: string
  updateData: {
    name?: string
    email?: string
    image?: string
    password?: string
  }
}

import { User } from '@/domain/entities'
import { UserRepository } from '@/domain/repositories'

export class UserAuthentication {
  constructor(readonly usersRepository: UserRepository) {}

  async execute(input: Input): Promise<User | undefined> {
    const user = await this.usersRepository.findByEmailAndPassword(
      input.email,
      input.password
    )
    return user
  }
}

type Input = {
  email: string
  password: string
}

import { UserRepository } from '@/domain/repositories'
import { GenerateTokenGateway } from '@/application/gateways'

export class UserAuthentication {
  constructor(
    readonly usersRepository: UserRepository,
    readonly generateTokenGateway: GenerateTokenGateway
  ) {}

  async execute(input: Input): Promise<string | undefined> {
    const user = await this.usersRepository.findByEmailAndPassword(
      input.email,
      input.password
    )
    const token = await this.generateTokenGateway.sign(
      { user: JSON.stringify(user) },
      {
        expiresIn: '60m'
      }
    )

    return token
  }
}

type Input = {
  email: string
  password: string
}

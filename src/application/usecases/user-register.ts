import { User } from '@/domain/entities'
import { UserRepository } from '@/domain/repositories'
import { GenerateIdGateway } from '@/application/gateways'

export class UserRegister {
  constructor(
    readonly usersRepository: UserRepository,
    readonly generateIdGateway: GenerateIdGateway
  ) {}

  async execute(input: Input): Promise<void> {
    const userId = await this.generateIdGateway.generate()
    const user = new User(
      userId,
      input.name,
      input.email,
      input.image,
      input.password
    )
    await this.usersRepository.save(user)
  }
}

type Input = {
  name: string
  email: string
  image: string
  password: string
}

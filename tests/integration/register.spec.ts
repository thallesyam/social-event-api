import { UserRegister } from '@/application/usecases/user-register'
import { UsersRepositoryMemory } from '@/infra/repositories/memory'
import { GenerateCryptoId } from '@/infra/gateways'

test('Deve criar um usuário e retornar a quantidade correta no repositório', async () => {
  const usersRepository = new UsersRepositoryMemory()
  const sut = {
    name: 'Thalles Ian',
    email: 'thallesyam@gmail.com',
    image: 'fake-image',
    password: '123'
  }
  const generateIdGateway = new GenerateCryptoId()
  const registerUser = new UserRegister(usersRepository, generateIdGateway)
  registerUser.execute(sut)
  const users = await usersRepository.findAll()
  expect(users.length).toBe(1)
})

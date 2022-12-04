import { UserRegister } from '@/application/usecases/user-register'
import { UsersRepositoryMemory } from '@/infra/repositories/memory'
import { GenerateCryptoId } from '@/infra/gateways'
import { UserAlreadyRegister } from '@/domain/errors'

test('Deve criar um usuário e retornar a quantidade correta no repositório', async () => {
  const sut = {
    name: 'Thalles Ian',
    email: 'thallesyam@gmail.com',
    image: 'fake-image',
    password: '123'
  }
  const usersRepository = new UsersRepositoryMemory()
  const generateIdGateway = new GenerateCryptoId()
  const registerUser = new UserRegister(usersRepository, generateIdGateway)
  await registerUser.execute(sut)
  const users = await usersRepository.findAll()
  expect(users.length).toBe(1)
})

test('Deve tentar criar um usuário com um email já existente', async () => {
  const sut = {
    name: 'Thalles Ian',
    email: 'thallesyam@gmail.com',
    image: 'fake-image',
    password: '123'
  }
  const usersRepository = new UsersRepositoryMemory()
  const generateIdGateway = new GenerateCryptoId()
  const registerUser = new UserRegister(usersRepository, generateIdGateway)
  await registerUser.execute(sut)
  expect(async () => await registerUser.execute(sut)).rejects.toThrowError(
    UserAlreadyRegister
  )
})

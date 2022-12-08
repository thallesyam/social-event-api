import { UserRegister } from '@/application/usecases'
import { UserRepositoryMemory } from '@/infra/repositories/memory'
import { GenerateCryptoId } from '@/infra/gateways'
import { UserAlreadyRegister } from '@/domain/errors'
import { PrismaClient } from '@prisma/client'
import { UserRepositoryDatabase } from '@/infra/repositories/database/user-repository'

// afterEach(async () => {
//   const prisma = new PrismaClient()
//   await prisma.user.deleteMany()
// })

test('Deve criar um usuário e retornar a quantidade correta no repositório', async () => {
  const sut = {
    name: 'Thalles Ian',
    email: 'thallesyam@gmail.com',
    image: 'fake-image',
    password: '123'
  }
  // const prisma = new PrismaClient()
  // const usersRepository = new UserRepositoryDatabase(prisma)
  const usersRepository = new UserRepositoryMemory()
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
  const usersRepository = new UserRepositoryMemory()
  const generateIdGateway = new GenerateCryptoId()
  const registerUser = new UserRegister(usersRepository, generateIdGateway)
  await registerUser.execute(sut)
  expect(async () => await registerUser.execute(sut)).rejects.toThrowError(
    UserAlreadyRegister
  )
})

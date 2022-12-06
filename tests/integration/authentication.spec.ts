import { UserAuthentication } from '@/application/usecases'
import { User } from '@/domain/entities'
import { UserNotFound } from '@/domain/errors'
import { GenerateJwtToken } from '@/infra/gateways'
import { UsersRepositoryMemory } from '@/infra/repositories/memory'

test('Deve se autenticar utilizando email e senha', async () => {
  const user = new User(
    '1',
    'Victoria',
    'vsamoraa@gmail.com',
    'fake-image',
    '123'
  )
  const usersRepository = new UsersRepositoryMemory()
  const generateTokenGateway = new GenerateJwtToken()
  await usersRepository.save(user)
  const sut = new UserAuthentication(usersRepository, generateTokenGateway)
  const input = {
    email: user.email,
    password: user.password
  }
  await sut.execute(input)
  expect(sut).toBeTruthy()
})

test('Deve tentar se autenticar utilizando email e senha inválidos', async () => {
  const user = new User(
    '1',
    'Victoria',
    'vsamoraa@gmail.com',
    'fake-image',
    '123'
  )
  const usersRepository = new UsersRepositoryMemory()
  const generateTokenGateway = new GenerateJwtToken()
  await usersRepository.save(user)
  const sut = new UserAuthentication(usersRepository, generateTokenGateway)
  const input = {
    email: 'thallesyam@gmail.com',
    password: user.password
  }

  expect(async () => await sut.execute(input)).rejects.toThrowError(
    UserNotFound
  )
})

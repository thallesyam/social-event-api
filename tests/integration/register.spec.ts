import { User } from '@/domain/entities'
import { UsersRepositoryMemory } from '@/infra/repositories/memory'

test('Deve criar um usuário e salva-lo', async () => {
  const sut = new User(
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const usersRepository = new UsersRepositoryMemory()
  await usersRepository.save(sut)
  const users = await usersRepository.findAll()
  expect(users.length).toBe(1)
})

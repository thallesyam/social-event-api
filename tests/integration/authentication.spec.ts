import { UserAuthentication } from '@/application/usecases/user-authentication'
import { User } from '@/domain/entities'
import { UsersRepositoryMemory } from '@/infra/repositories/memory'

test('Deve conseguir se autenticar utilizando email e senha', async () => {
  const user = new User(
    '1',
    'Victoria',
    'vsamoraa@gmail.com',
    'fake-image',
    '123'
  )
  const usersRepository = new UsersRepositoryMemory()
  await usersRepository.save(user)
  const sut = new UserAuthentication(usersRepository)
  const input = {
    email: user.email,
    password: user.password
  }
  await sut.execute(input)
  expect(sut).toBeTruthy()
})

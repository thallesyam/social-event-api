import { Follow } from '@/application/usecases'
import { User } from '@/domain/entities'
import { UserRepositoryDatabase } from '@/infra/repositories/database'
import { UserRepositoryMemory } from '@/infra/repositories/memory'
import { PrismaClient } from '@prisma/client'

test('Deve conseguir seguir um usuário', async () => {
  const from = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const to = new User('2', 'Akin', 'akin@gmail.com', 'fake-image', '123')

  // follower -> // Seguidor -> from -> Quantas pessoas ## segue ?
  // following -> // Seguindo -> to -> Quantas pessoas estão seguindo ## ?

  // const prisma = new PrismaClient()
  const usersRepository = new UserRepositoryMemory()
  // const usersRepository = new UserRepositoryDatabase(prisma)
  await usersRepository.save(to)
  await usersRepository.save(from)
  const sut = new Follow(usersRepository)
  const input = {
    from: from.userId,
    to: to.userId
  }
  await sut.execute(input)

  const fromData = await usersRepository.findOneById(from.userId)
  const toData = await usersRepository.findOneById(to.userId)

  expect(fromData.followers.length).toBe(1)
  expect(toData.following.length).toBe(1)
})

test('Deve deixar de seguir um usuário', async () => {
  const from = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const to = new User('2', 'Akin', 'akin@gmail.com', 'fake-image', '123')

  // const prisma = new PrismaClient()
  const usersRepository = new UserRepositoryMemory()
  // const usersRepository = new UserRepositoryDatabase(prisma)
  await usersRepository.save(to)
  await usersRepository.save(from)
  const sut = new Follow(usersRepository)
  const input = {
    from: from.userId,
    to: to.userId
  }
  await sut.execute(input)
  await sut.execute(input)

  const fromData = await usersRepository.findOneById(from.userId)
  const toData = await usersRepository.findOneById(to.userId)

  expect(fromData.followers.length).toBe(0)
  expect(toData.following.length).toBe(0)
})

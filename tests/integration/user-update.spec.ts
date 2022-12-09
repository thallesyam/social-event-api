import { EventUpdate } from '@/application/usecases'
import { UserUpdate } from '@/application/usecases/user-update'
import { User, Event } from '@/domain/entities'
import {
  EventRepositoryMemory,
  UserRepositoryMemory
} from '@/infra/repositories/memory'
import { PrismaClient } from '@prisma/client'

test('Deve editar o os dados de um usuário', async () => {
  const user = new User(
    '2487e29e-5b62-4839-b070-6819c6a7af57',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )

  const updateData = {
    image: 'fake-url'
  }
  // const prisma = new PrismaClient()
  // const eventRepository = new EventRepositoryDatabase(prisma)
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const sut = new UserUpdate(userRepository)
  const input = {
    userId: user.userId,
    updateData
  }
  await sut.execute(input)
  const userData = await userRepository.findOneById(user.userId)
  expect(userData.image).toBe(updateData.image)
})

import { EventUpdate } from '@/application/usecases'
import { User, Event } from '@/domain/entities'
import {
  EventRepositoryMemory,
  UserRepositoryMemory
} from '@/infra/repositories/memory'
import { PrismaClient } from '@prisma/client'

test('Deve editar o status de um evento', async () => {
  const date = new Date()
  const owner = new User(
    '2487e29e-5b62-4839-b070-6819c6a7af57',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const event = new Event(
    '1',
    owner.userId,
    'Aula sobre typescript',
    'aula-sobre-typescript',
    'Aula voltada para enterder o básico da sintaxe typescript',
    new Date(date.setDate(date.getDate() + 1)),
    '11932245266',
    100,
    'onSite',
    'Rua Francisco da cunha'
  )

  const updateData = {
    address: 'Jardim Itapemirim'
  }
  // const prisma = new PrismaClient()
  // const eventRepository = new EventRepositoryDatabase(prisma)
  const eventRepository = new EventRepositoryMemory()

  const userRepository = new UserRepositoryMemory()
  await userRepository.save(owner)
  await eventRepository.save(event)
  const sut = new EventUpdate(eventRepository, userRepository)
  const input = {
    eventId: event.eventId,
    ownerId: owner.userId,
    updateData
  }
  await sut.execute(input)
  const eventData = await eventRepository.findOneById(event.eventId)
  expect(eventData.address).toBe(updateData.address)
})

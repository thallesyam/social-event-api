import { EventUpdateStatus } from '@/application/usecases/event-update'
import { User, Event } from '@/domain/entities'
import { EventIdNotFound, UserNotPermission } from '@/domain/errors'
import { EventRepositoryDatabase } from '@/infra/repositories/database/event-repository'
import {
  EventRepositoryMemory,
  UserRepositoryMemory
} from '@/infra/repositories/memory'
import { PrismaClient } from '@prisma/client'

test('Deve criar e alterar o status de uma enrollment', async () => {
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
  // const prisma = new PrismaClient()
  // const eventRepository = new EventRepositoryDatabase(prisma)
  const eventRepository = new EventRepositoryMemory()

  const userRepository = new UserRepositoryMemory()
  await userRepository.save(owner)
  await eventRepository.save(event)
  const sut = new EventUpdateStatus(eventRepository, userRepository)
  const input = {
    eventId: event.eventId,
    ownerId: owner.userId
  }
  await sut.execute(input)
  const eventStatus = await eventRepository.findOneById(event.eventId)
  expect(eventStatus.status).toBe(false)
})

test('Deve tentar criar e alterar o status de uma enrollment passando um evento inválido', async () => {
  const date = new Date()
  const owner = new User(
    '1',
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
  const eventRepository = new EventRepositoryMemory()
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(owner)
  await eventRepository.save(event)
  const sut = new EventUpdateStatus(eventRepository, userRepository)
  const input = {
    eventId: '',
    ownerId: owner.userId
  }
  expect(async () => await sut.execute(input)).rejects.toThrowError(
    EventIdNotFound
  )
})

test('Deve tentar criar e alterar o status de uma enrollment que o usuário não é dono', async () => {
  const date = new Date()
  const owner = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const user = new User(
    '2',
    'Thalles Ian',
    'thallesyam1@gmail.com',
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
  const eventRepository = new EventRepositoryMemory()
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(owner)
  await userRepository.save(user)
  await eventRepository.save(event)
  const sut = new EventUpdateStatus(eventRepository, userRepository)
  const input = {
    eventId: event.eventId,
    ownerId: user.userId
  }
  expect(async () => await sut.execute(input)).rejects.toThrowError(
    UserNotPermission
  )
})

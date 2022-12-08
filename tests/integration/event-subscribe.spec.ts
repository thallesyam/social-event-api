import { EventSubscribe } from '@/application/usecases'
import { Event, User } from '@/domain/entities'
import {
  EventIdNotFound,
  InvalidEnrollment,
  InvalidEvent,
  UserIdNotFound
} from '@/domain/errors'
import { GenerateCryptoId } from '@/infra/gateways'
import {
  EventRepositoryDatabase,
  UserRepositoryDatabase
} from '@/infra/repositories/database'
import {
  UserRepositoryMemory,
  EventRepositoryMemory
} from '@/infra/repositories/memory'
import { PrismaClient } from '@prisma/client'

test('Deve realizar uma inscrição com um usuário e evento válido', async () => {
  const date = new Date()
  const owner = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const subscriber = new User(
    '2',
    'Akin',
    'akin@gmail.com',
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
  const generateIdGateway = new GenerateCryptoId()
  // const prisma = new PrismaClient()
  // const eventRepository = new EventRepositoryDatabase(prisma)
  // const userRepository = new UserRepositoryDatabase(prisma)
  const eventRepository = new EventRepositoryMemory()
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(owner)
  await userRepository.save(subscriber)
  await eventRepository.save(event)
  const sut = new EventSubscribe(eventRepository, userRepository)

  const input = {
    subscriberId: subscriber.userId,
    eventId: event.eventId
  }
  await sut.execute(input)
  const enrollments = await eventRepository.findAll()
  expect(enrollments[0].subscriptions.length).toBe(1)
})

test('Deve tentar realizar uma inscrição com um usuário inválido', async () => {
  const date = new Date()
  const owner = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const subscriber = new User(
    '2',
    'Akin',
    'akin@gmail.com',
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
  const generateIdGateway = new GenerateCryptoId()
  const eventRepository = new EventRepositoryMemory()
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(owner)
  await userRepository.save(subscriber)
  await eventRepository.save(event)
  const sut = new EventSubscribe(eventRepository, userRepository)

  const input = {
    subscriberId: '3',
    eventId: event.eventId
  }
  expect(async () => await sut.execute(input)).rejects.toThrowError(
    UserIdNotFound
  )
})

test('Deve tentar realizar uma inscrição com um evento inexistente', async () => {
  const date = new Date()
  const owner = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const subscriber = new User(
    '2',
    'Akin',
    'akin@gmail.com',
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
  const generateIdGateway = new GenerateCryptoId()
  const eventRepository = new EventRepositoryMemory()
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(owner)
  await userRepository.save(subscriber)
  await eventRepository.save(event)
  const sut = new EventSubscribe(eventRepository, userRepository)

  const input = {
    subscriberId: subscriber.userId,
    eventId: '3'
  }
  expect(async () => await sut.execute(input)).rejects.toThrowError(
    EventIdNotFound
  )
})

test('Deve tentar realizar uma inscrição com um evento fechado', async () => {
  const date = new Date()
  const owner = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const subscriber = new User(
    '2',
    'Akin',
    'akin@gmail.com',
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
  event.status = false
  const eventRepository = new EventRepositoryMemory()
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(owner)
  await userRepository.save(subscriber)
  await eventRepository.save(event)
  const sut = new EventSubscribe(eventRepository, userRepository)

  const input = {
    subscriberId: subscriber.userId,
    eventId: event.eventId
  }
  expect(async () => await sut.execute(input)).rejects.toThrowError(
    InvalidEvent
  )
})

test('Deve tentar realizar uma inscrição duplicada', async () => {
  const date = new Date()
  const owner = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const subscriber = new User(
    '2',
    'Akin',
    'akin@gmail.com',
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
  // const prisma = new PrismaClient()
  // const eventRepository = new EventRepositoryDatabase(prisma)
  // const userRepository = new UserRepositoryDatabase(prisma)
  await userRepository.save(owner)
  await userRepository.save(subscriber)
  await eventRepository.save(event)
  const sut = new EventSubscribe(eventRepository, userRepository)

  const input = {
    subscriberId: subscriber.userId,
    eventId: event.eventId
  }
  await sut.execute(input)

  expect(async () => await sut.execute(input)).rejects.toThrowError(
    InvalidEnrollment
  )
})

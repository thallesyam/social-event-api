import { EventSubscribe } from '@/application/usecases/event-subscribe'
import { Event, User } from '@/domain/entities'
import { EventIdNotFound, UserIdNotFound } from '@/domain/errors'
import { GenerateCryptoId } from '@/infra/gateways'
import {
  UserRepositoryMemory,
  EventRepositoryMemory,
  EnrollmentRepositoryMemory
} from '@/infra/repositories/memory'

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
  const eventRepository = new EventRepositoryMemory()
  const userRepository = new UserRepositoryMemory()
  const enrollmentRepository = new EnrollmentRepositoryMemory()
  await userRepository.save(owner)
  await userRepository.save(subscriber)
  await eventRepository.save(event)
  const sut = new EventSubscribe(
    eventRepository,
    userRepository,
    enrollmentRepository,
    generateIdGateway
  )

  const input = {
    subscriberId: subscriber.userId,
    eventId: event.eventId
  }
  await sut.execute(input)
  const enrollments = await enrollmentRepository.findAll()
  expect(enrollments.length).toBe(1)
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
  const enrollmentRepository = new EnrollmentRepositoryMemory()
  await userRepository.save(owner)
  await userRepository.save(subscriber)
  await eventRepository.save(event)
  const sut = new EventSubscribe(
    eventRepository,
    userRepository,
    enrollmentRepository,
    generateIdGateway
  )

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
  const enrollmentRepository = new EnrollmentRepositoryMemory()
  await userRepository.save(owner)
  await userRepository.save(subscriber)
  await eventRepository.save(event)
  const sut = new EventSubscribe(
    eventRepository,
    userRepository,
    enrollmentRepository,
    generateIdGateway
  )

  const input = {
    subscriberId: subscriber.userId,
    eventId: '3'
  }
  expect(async () => await sut.execute(input)).rejects.toThrowError(
    EventIdNotFound
  )
})

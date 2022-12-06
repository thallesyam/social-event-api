import { EventSubscribe } from '@/application/usecases'
import { User, Event } from '@/domain/entities'
import { InvalidEnrollment } from '@/domain/errors'
import { GenerateCryptoId } from '@/infra/gateways'
import {
  EnrollmentRepositoryMemory,
  EventRepositoryMemory,
  UserRepositoryMemory
} from '@/infra/repositories/memory'

test('Deve retornar todos os eventos que o usuário está inscrito', async () => {
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
    'Aula voltada para enterder o básico da sintaxe typescript',
    new Date(date.setDate(date.getDate() + 1)),
    '11932245266',
    100,
    'onSite',
    'Rua Francisco da cunha'
  )

  const secondEvent = new Event(
    '11',
    owner.userId,
    'Aula sobre react',
    'Aula voltada para enterder o básico da sintaxe react',
    new Date(date.setDate(date.getDate() + 1)),
    '11932245266',
    100,
    'onSite',
    'Rua Francisco da cunha'
  )

  const subscriber = new User(
    '2',
    'Akin',
    'akin@gmail.com',
    'fake-image',
    '123'
  )

  const generateIdGateway = new GenerateCryptoId()
  const eventRepository = new EventRepositoryMemory()
  const userRepository = new UserRepositoryMemory()
  const enrollmentRepository = new EnrollmentRepositoryMemory()
  await userRepository.save(owner)
  await userRepository.save(subscriber)
  await eventRepository.save(event)
  await eventRepository.save(secondEvent)
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
  const secondInput = {
    subscriberId: subscriber.userId,
    eventId: secondEvent.eventId
  }
  await sut.execute(input)
  await sut.execute(secondInput)
  const enrollments = await enrollmentRepository.findBySubscriberId(
    subscriber.userId
  )
  expect(enrollments.length).toBe(2)
})

test('Deve tentar cadastrar um usuário duplicado em um evento', async () => {
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
    'Aula voltada para enterder o básico da sintaxe typescript',
    new Date(date.setDate(date.getDate() + 1)),
    '11932245266',
    100,
    'onSite',
    'Rua Francisco da cunha'
  )
  const subscriber = new User(
    '2',
    'Akin',
    'akin@gmail.com',
    'fake-image',
    '123'
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
  expect(async () => await sut.execute(input)).rejects.toThrowError(
    InvalidEnrollment
  )
})

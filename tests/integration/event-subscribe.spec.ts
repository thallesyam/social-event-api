import { EventSubscribe } from '@/application/usecases/event-subscribe'
import { Event, User } from '@/domain/entities'
import { GenerateCryptoId } from '@/infra/gateways'
import {
  UsersRepositoryMemory,
  EventRepositoryMemory,
  EnrollmentRepositoryMemory
} from '@/infra/repositories/memory'

test('Deve realizar uma inscrição com um usuário e evento válido', async () => {
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
    'Aula voltada para enterder o básico da sintaxe typescript',
    new Date('2022-12-06T12:00:00'),
    '11932245266',
    100,
    'onSite',
    'Rua Francisco da cunha'
  )
  const generateIdGateway = new GenerateCryptoId()
  const eventRepository = new EventRepositoryMemory()
  const usersRepository = new UsersRepositoryMemory()
  const enrollmentRepository = new EnrollmentRepositoryMemory()
  await usersRepository.save(owner)
  await usersRepository.save(subscriber)
  await eventRepository.save(event)
  const sut = new EventSubscribe(
    eventRepository,
    usersRepository,
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

// test.todo(
//   'Deve tentar realizar uma inscrição com um usuário e evento inválido',
//   () => {}
// )

// test.todo(
//   'Deve tentar realizar uma inscrição com um usuário inexistente',
//   () => {}
// )

// test.todo(
//   'Deve tentar realizar uma inscrição com um evento inexistente',
//   () => {}
// )

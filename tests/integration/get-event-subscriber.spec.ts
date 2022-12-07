import { EventSubscribe } from '@/application/usecases'
import { GetEventSubscriber } from '@/application/usecases/get-event-subscriber'
import { User, Event, Enrollment } from '@/domain/entities'
import { GenerateCryptoId } from '@/infra/gateways'
import {
  EnrollmentRepositoryMemory,
  EventRepositoryMemory,
  UserRepositoryMemory
} from '@/infra/repositories/memory'

test('Deve retornar os dados do usuário a partir da lista de inscrições do evento', async () => {
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
  const subscribeUser = new EventSubscribe(
    eventRepository,
    userRepository,
    enrollmentRepository,
    generateIdGateway
  )

  const input = {
    subscriberId: subscriber.userId,
    eventId: event.eventId
  }
  await subscribeUser.execute(input)
  const enrollments = (await enrollmentRepository.findByEventId(
    event.eventId
  )) as Enrollment
  const sut = new GetEventSubscriber(userRepository)
  const users = await sut.execute({ subscriptions: enrollments.subscriptions })
  expect(users[0].name).toBe(subscriber.name)
})

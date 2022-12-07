import { GetUserEvent } from '@/application/usecases'
import { User, Event } from '@/domain/entities'
import {
  EventRepositoryMemory,
  UserRepositoryMemory
} from '@/infra/repositories/memory'

test('Deve retornar todos os eventos que o usuário é dono', async () => {
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
  const sut = new GetUserEvent(userRepository, eventRepository)
  const events = await sut.execute({ userId: owner.userId })
  expect(events.length).toBe(1)
})

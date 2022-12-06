import { EventCreate } from '@/application/usecases'
import { User } from '@/domain/entities'
import { UserNotPermission } from '@/domain/errors'
import { GenerateCryptoId } from '@/infra/gateways'
import {
  EventRepositoryMemory,
  UsersRepositoryMemory
} from '@/infra/repositories/memory'

test('Deve criar um evento com um usuário válido', async () => {
  const eventRepository = new EventRepositoryMemory()
  const generateIdGateway = new GenerateCryptoId()
  const user = new User(
    '1',
    'Victoria',
    'vsamoraa@gmail.com',
    'fake-image',
    '123'
  )
  const userRepository = new UsersRepositoryMemory()
  await userRepository.save(user)
  const sut = new EventCreate(
    eventRepository,
    userRepository,
    generateIdGateway
  )
  const input = {
    ownerId: user.userId,
    eventName: 'Aula sobre typescript',
    description: 'Aula voltada para enterder o básico da sintaxe typescript',
    eventDate: new Date('2022-12-06T12:00:00'),
    paymentKey: '11932245266',
    price: 100
  }
  await sut.execute(input)
  const events = await eventRepository.findOneByUserId(user.userId)
  expect(events.length).toBe(1)
})

test('Deve criar mais de um evento com um usuário administrador', async () => {
  const eventRepository = new EventRepositoryMemory()
  const generateIdGateway = new GenerateCryptoId()
  const user = new User(
    '1',
    'Victoria',
    'vsamoraa@gmail.com',
    'fake-image',
    '123'
  )
  user.setIsPayingUser()
  const userRepository = new UsersRepositoryMemory()
  await userRepository.save(user)
  const sut = new EventCreate(
    eventRepository,
    userRepository,
    generateIdGateway
  )
  const input = {
    ownerId: user.userId,
    eventName: 'Aula sobre typescript',
    description: 'Aula voltada para enterder o básico da sintaxe typescript',
    eventDate: new Date('2022-12-06T12:00:00'),
    paymentKey: '11932245266',
    price: 100
  }
  await sut.execute(input)
  await sut.execute(input)
  const events = await eventRepository.findOneByUserId(user.userId)
  expect(events.length).toBe(2)
})

test('Deve tentar criar mais de um evento com um usuário comum', async () => {
  const eventRepository = new EventRepositoryMemory()
  const generateIdGateway = new GenerateCryptoId()
  const user = new User(
    '1',
    'Victoria',
    'vsamoraa@gmail.com',
    'fake-image',
    '123'
  )
  const userRepository = new UsersRepositoryMemory()
  await userRepository.save(user)
  const sut = new EventCreate(
    eventRepository,
    userRepository,
    generateIdGateway
  )
  const input = {
    ownerId: user.userId,
    eventName: 'Aula sobre typescript',
    description: 'Aula voltada para enterder o básico da sintaxe typescript',
    eventDate: new Date('2022-12-06T12:00:00'),
    paymentKey: '11932245266',
    price: 100
  }
  await sut.execute(input)
  expect(async () => await sut.execute(input)).rejects.toThrowError(
    UserNotPermission
  )
})

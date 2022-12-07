import { EventCreate } from '@/application/usecases'
import { User } from '@/domain/entities'
import { UserNotPermission } from '@/domain/errors'
import { GenerateCryptoId, GenerateLocalSlugGateway } from '@/infra/gateways'
import { EventRepositoryDatabase } from '@/infra/repositories/database/event-repository'
import {
  EventRepositoryMemory,
  UserRepositoryMemory
} from '@/infra/repositories/memory'
import { PrismaClient } from '@prisma/client'

afterEach(async () => {
  const prisma = new PrismaClient()
  await prisma.event.deleteMany()
})

test('Deve criar um evento com um usuário válido', async () => {
  // const prisma = new PrismaClient()
  // const eventRepository = new EventRepositoryDatabase(prisma)
  const eventRepository = new EventRepositoryMemory()
  const generateIdGateway = new GenerateCryptoId()
  const generateSlugGateway = new GenerateLocalSlugGateway()
  const user = new User(
    '2487e29e-5b62-4839-b070-6819c6a7af57',
    'Victoria',
    'vsamoraa@gmail.com',
    'fake-image',
    '123'
  )
  user.setIsPayingUser()
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const sut = new EventCreate(
    eventRepository,
    userRepository,
    generateIdGateway,
    generateSlugGateway
  )
  const date = new Date()
  const input = {
    ownerId: user.userId,
    eventName: 'Aula sobre typescript',
    description: 'Aula voltada para enterder o básico da sintaxe typescript',
    eventDate: new Date(date.setDate(date.getDate() + 1)),
    paymentKey: '11932245266',
    price: 100
  }
  await sut.execute(input)
  const events = await eventRepository.findByUserId(user.userId)
  expect(events.length).toBe(1)
})

test('Deve criar mais de um evento com um usuário administrador', async () => {
  const eventRepository = new EventRepositoryMemory()
  const generateIdGateway = new GenerateCryptoId()
  const generateSlugGateway = new GenerateLocalSlugGateway()
  const user = new User(
    '1',
    'Victoria',
    'vsamoraa@gmail.com',
    'fake-image',
    '123'
  )
  user.setIsPayingUser()
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const sut = new EventCreate(
    eventRepository,
    userRepository,
    generateIdGateway,
    generateSlugGateway
  )
  const date = new Date()
  const input = {
    ownerId: user.userId,
    eventName: 'Aula sobre typescript',
    description: 'Aula voltada para enterder o básico da sintaxe typescript',
    eventDate: new Date(date.setDate(date.getDate() + 1)),
    paymentKey: '11932245266',
    price: 100
  }
  await sut.execute(input)
  await sut.execute(input)
  const events = await eventRepository.findByUserId(user.userId)
  expect(events.length).toBe(2)
})

test('Deve tentar criar mais de um evento com um usuário comum', async () => {
  const eventRepository = new EventRepositoryMemory()
  const generateIdGateway = new GenerateCryptoId()
  const generateSlugGateway = new GenerateLocalSlugGateway()
  const user = new User(
    '1',
    'Victoria',
    'vsamoraa@gmail.com',
    'fake-image',
    '123'
  )
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const sut = new EventCreate(
    eventRepository,
    userRepository,
    generateIdGateway,
    generateSlugGateway
  )
  const date = new Date()
  const input = {
    ownerId: user.userId,
    eventName: 'Aula sobre typescript',
    description: 'Aula voltada para enterder o básico da sintaxe typescript',
    eventDate: new Date(date.setDate(date.getDate() + 1)),
    paymentKey: '11932245266',
    price: 100
  }
  await sut.execute(input)
  expect(async () => await sut.execute(input)).rejects.toThrowError(
    UserNotPermission
  )
})

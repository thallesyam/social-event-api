import { EventCreate } from '@/application/usecases'
import { GenerateCryptoId } from '@/infra/gateways'
import { EventRepositoryMemory } from '@/infra/repositories/memory'

test('Deve criar um evento com um usuário válido', async () => {
  const eventRepository = new EventRepositoryMemory()
  const generateIdGateway = new GenerateCryptoId()
  const sut = new EventCreate(eventRepository, generateIdGateway)
  const input = {
    eventName: 'Aula sobre typescript',
    description: 'Aula voltada para enterder o básico da sintaxe typescript',
    eventDate: new Date('2022-12-06T12:00:00'),
    paymentKey: '11932245266',
    price: 100
  }
  await sut.execute(input)
  const events = await eventRepository.findAll()
  expect(events.length).toBe(1)
})

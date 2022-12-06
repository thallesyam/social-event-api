import { Subscription } from '@/domain/entities/subscription'
import { InvalidSubscription } from '@/domain/errors'

test('Deve criar uma inscrição de um evento com uma lista de usuários', () => {
  const sut = new Subscription('1')
  expect(sut.eventId).toBe('1')
  expect(sut.subscribers.length).toBe(0)
})

test('Deve criar uma inscrição de um evento com uma lista de usuários', () => {
  expect(() => new Subscription('')).toThrowError(InvalidSubscription)
})

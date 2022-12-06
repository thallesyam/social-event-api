import { Enrollment } from '@/domain/entities'
import { InvalidEnrollment } from '@/domain/errors'

test('Deve criar uma inscrição de um evento com uma lista de usuários', () => {
  const sut = new Enrollment('1', '1', '1')
  expect(sut.eventId).toBe('1')
  expect(sut.subscriptions.length).toBe(0)
})

test('Deve criar uma inscrição de um evento com uma lista de usuários', () => {
  expect(() => new Enrollment('', '', '')).toThrowError(InvalidEnrollment)
})

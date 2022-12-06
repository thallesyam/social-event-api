import { Enrollment } from '@/domain/entities/enrollment'
import { InvalidEnrollment } from '@/domain/errors'

test('Deve criar uma inscrição de um evento com uma lista de usuários', () => {
  const sut = new Enrollment('1')
  expect(sut.eventId).toBe('1')
  expect(sut.enrollments.length).toBe(0)
})

test('Deve criar uma inscrição de um evento com uma lista de usuários', () => {
  expect(() => new Enrollment('')).toThrowError(InvalidEnrollment)
})

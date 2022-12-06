import { User } from '@/domain/entities'
import { Event } from '@/domain/entities'
import { InvalidEvent } from '@/domain/errors'

test('Deve criar um evento com os dados corretos', () => {
  const user = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const sut = new Event(
    user.userId,
    'Aula sobre typescript',
    'Aula voltada para enterder o básico da sintaxe typescript',
    new Date('2022-12-06T12:00:00'),
    '11932245266',
    100,
    'onSite',
    'Rua Francisco da cunha'
  )

  expect(sut.eventName).toBe('Aula sobre typescript')
  expect(sut.paymentKey).toBe('11932245266')
  expect(sut.price).toBe(100)
})

test('Deve criar um evento na modalidade remota', () => {
  const user = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const sut = new Event(
    user.userId,
    'Aula sobre typescript',
    'Aula voltada para enterder o básico da sintaxe typescript',
    new Date('2022-12-06T12:00:00'),
    '11932245266',
    100
  )

  expect(sut.modality).toBe('remote')
})

test('Deve criar um evento com um usuário inscrito', () => {
  const user = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  const sut = new Event(
    user.userId,
    'Aula sobre typescript',
    'Aula voltada para enterder o básico da sintaxe typescript',
    new Date('2022-12-06T12:00:00'),
    '11932245266',
    100
  )

  sut.setSubscribers('2')

  expect(sut.getSubscribers().length).toBe(1)
})

test('Deve tentar criar um evento com os dados incorretos', () => {
  const user = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )

  expect(
    () =>
      new Event(
        user.userId,
        '',
        'Aula voltada para enterder o básico da sintaxe typescript',
        new Date('2022-12-06T12:00:00'),
        '',
        100,
        'onSite',
        'Rua Francisco da cunha'
      )
  ).toThrowError(InvalidEvent)
})

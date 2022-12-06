import { User } from '@/domain/entities'
import { InvalidUser } from '@/domain/errors'

test('Deve criar um usuário com os dados corretos', () => {
  const sut = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  expect(sut.name).toBe('Thalles Ian')
  expect(sut.email).toBe('thallesyam@gmail.com')
})

test('Deve tentar criar um usuário com os dados incorretos', () => {
  expect(() => new User('1', '', '', 'fake-image', '123')).toThrowError(
    InvalidUser
  )
})

test('Deve validar se o usuário é um pagante', () => {
  const sut = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  expect(sut.getIsPayingUser()).toBe(false)
})

test('Deve setar o usuário como um pagante', () => {
  const sut = new User(
    '1',
    'Thalles Ian',
    'thallesyam@gmail.com',
    'fake-image',
    '123'
  )
  sut.setIsPayingUser()
  expect(sut.getIsPayingUser()).toBe(true)
})

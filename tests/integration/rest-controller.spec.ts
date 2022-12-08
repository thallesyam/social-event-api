import axios from 'axios'

test('Deve testar registro de usuário', async () => {
  const input = {
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }

  const response = await axios.post('http://localhost:3000/register', input)
  const user = response.status
  expect(user).toBe(200)
})

test('Deve testar a autenticação de usuário', async () => {
  const input = {
    email: 'thallesyam2@gmail.com',
    password: '1234'
  }

  const response = await axios.post(
    'http://localhost:3000/authentication',
    input
  )
  const user = response.status
  expect(user).toBe(200)
})

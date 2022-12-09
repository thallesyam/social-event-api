import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

afterEach(async () => {
  await prisma.subscription.deleteMany()
  await prisma.follows.deleteMany()
  await prisma.event.deleteMany()
  await prisma.user.deleteMany()
})

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
  const user = {
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', user)
  const input = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const response = await axios.post(
    'http://localhost:3000/authentication',
    input
  )
  const { token } = response.data
  expect(token).toBeTruthy()
})

test('Deve testar a busca de usuários', async () => {
  const user = {
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', user)
  const input = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const auth = await axios.post('http://localhost:3000/authentication', input)
  const { token } = auth.data
  const users = await axios.get('http://localhost:3000/users', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })

  expect(users.data.length).toBe(1)
})

test('Deve testar a busca de usuário', async () => {
  const registerUser = {
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', registerUser)
  const input = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const auth = await axios.post('http://localhost:3000/authentication', input)
  const { token } = auth.data
  const users = await axios.get('http://localhost:3000/users', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const user = await axios.get(
    `http://localhost:3000/user/${users.data[0].userId}`,
    {
      headers: {
        Authorization: `Baerer ${token}`
      }
    }
  )
  expect(user.data.email).toBe(users.data[0].email)
})

test('Deve criar um evento', async () => {
  const user = {
    userId: '1',
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', user)
  const authData = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const auth = await axios.post(
    'http://localhost:3000/authentication',
    authData
  )
  const { token } = auth.data

  const users = await axios.get('http://localhost:3000/users', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })

  const input = {
    ownerId: users.data[0].userId,
    eventName: 'string',
    description: 'string',
    eventDate: '2023-07-01T12:00:00',
    paymentKey: '11',
    price: 100
  }

  const response = await axios.post('http://localhost:3000/event', input, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const event = response.status
  expect(event).toBe(200)
})

test('Deve testar a busca de eventos', async () => {
  const user = {
    userId: '1',
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', user)
  const authData = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const auth = await axios.post(
    'http://localhost:3000/authentication',
    authData
  )
  const { token } = auth.data
  const users = await axios.get('http://localhost:3000/users', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const event = {
    ownerId: users.data[0].userId,
    eventName: 'string',
    description: 'string',
    eventDate: '2023-07-01T12:00:00',
    paymentKey: '11',
    price: 100
  }
  await axios.post('http://localhost:3000/event', event, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })

  const events = await axios.get('http://localhost:3000/events', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  expect(events.data.length).toBe(1)
  expect(events.data[0].eventName).toBe(event.eventName)
})

test('Deve testar a busca de um evento', async () => {
  const user = {
    userId: '1',
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', user)
  const authData = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const auth = await axios.post(
    'http://localhost:3000/authentication',
    authData
  )
  const { token } = auth.data
  const users = await axios.get('http://localhost:3000/users', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const inputEvent = {
    ownerId: users.data[0].userId,
    eventName: 'string',
    description: 'string',
    eventDate: '2023-07-01T12:00:00',
    paymentKey: '11',
    price: 100
  }
  await axios.post('http://localhost:3000/event', inputEvent, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const events = await axios.get('http://localhost:3000/events', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const event = await axios.get(
    `http://localhost:3000/event/${events.data[0].eventId}`,
    {
      headers: {
        Authorization: `Baerer ${token}`
      }
    }
  )
  expect(event.data.eventName).toBe(inputEvent.eventName)
})

test('Deve testar a inscrição evento', async () => {
  const user = {
    userId: '1',
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', user)
  const authData = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const auth = await axios.post(
    'http://localhost:3000/authentication',
    authData
  )
  const { token } = auth.data
  const users = await axios.get('http://localhost:3000/users', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const inputEvent = {
    ownerId: users.data[0].userId,
    eventName: 'string',
    description: 'string',
    eventDate: '2023-07-01T12:00:00',
    paymentKey: '11',
    price: 100
  }
  await axios.post('http://localhost:3000/event', inputEvent, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const events = await axios.get('http://localhost:3000/events', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const input = {
    subscriberId: users.data[0].userId,
    eventId: events.data[0].eventId
  }

  const subscription = await axios.post(
    `http://localhost:3000/subscribe`,
    input,
    {
      headers: {
        Authorization: `Baerer ${token}`
      }
    }
  )
  expect(subscription.status).toBe(200)
})

test('Deve fechar um evento', async () => {
  const user = {
    userId: '1',
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', user)
  const authData = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const auth = await axios.post(
    'http://localhost:3000/authentication',
    authData
  )
  const { token } = auth.data
  const users = await axios.get('http://localhost:3000/users', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const inputEvent = {
    ownerId: users.data[0].userId,
    eventName: 'string',
    description: 'string',
    eventDate: '2023-07-01T12:00:00',
    paymentKey: '11',
    price: 100
  }
  await axios.post('http://localhost:3000/event', inputEvent, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const events = await axios.get('http://localhost:3000/events', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const input = {
    ownerId: users.data[0].userId,
    eventId: events.data[0].eventId
  }
  const event = await axios.patch(`http://localhost:3000/event`, input, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  expect(event.status).toBe(200)
})

test('Deve testar a funcionalidade de follow', async () => {
  const from = {
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  const to = {
    name: 'akin',
    email: 'akinyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', from)
  await axios.post('http://localhost:3000/register', to)

  const inputAuth = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const auth = await axios.post(
    'http://localhost:3000/authentication',
    inputAuth
  )
  const { token } = auth.data
  const users = await axios.get('http://localhost:3000/users', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const input = {
    from: users.data[0].userId,
    to: users.data[1].userId
  }

  const follow = await axios.post('http://localhost:3000/follow', input, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })

  expect(follow.status).toBe(200)
})

test('Deve atualizar um evento', async () => {
  const user = {
    userId: '1',
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', user)
  const authData = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const auth = await axios.post(
    'http://localhost:3000/authentication',
    authData
  )
  const { token } = auth.data
  const users = await axios.get('http://localhost:3000/users', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const inputEvent = {
    ownerId: users.data[0].userId,
    eventName: 'string',
    description: 'string',
    eventDate: '2023-07-01T12:00:00',
    paymentKey: '11',
    price: 100
  }
  await axios.post('http://localhost:3000/event', inputEvent, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const events = await axios.get('http://localhost:3000/events', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const updateData = {
    address: 'Jardim Itapemirim'
  }
  const input = {
    ownerId: users.data[0].userId,
    eventId: events.data[0].eventId,
    updateData
  }
  const event = await axios.put(`http://localhost:3000/event`, input, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  expect(event.status).toBe(200)
})

test('Deve atualizar um usuário', async () => {
  const userUpdate = {
    userId: '1',
    name: 'thalles',
    email: 'thallesyam1@gmail.com',
    image: 'a',
    password: '1234'
  }
  await axios.post('http://localhost:3000/register', userUpdate)
  const authData = {
    email: 'thallesyam1@gmail.com',
    password: '1234'
  }
  const auth = await axios.post(
    'http://localhost:3000/authentication',
    authData
  )
  const { token } = auth.data
  const users = await axios.get('http://localhost:3000/users', {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  const updateData = {
    image: 'Jardim Itapemirim'
  }
  const input = {
    eventId: users.data[0].eventId,
    updateData
  }
  const user = await axios.put(`http://localhost:3000/user`, input, {
    headers: {
      Authorization: `Baerer ${token}`
    }
  })
  expect(user.status).toBe(200)
})

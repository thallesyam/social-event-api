import { RestController } from './infra/controller/rest'
import { ExpressAdapter } from './infra/http/express-adapter'
import {
  EventCreate,
  EventSubscribe,
  EventUpdateStatus,
  Follow,
  GetEvent,
  GetEvents,
  GetUser,
  GetUsers,
  GetUserEvent,
  UserAuthentication,
  UserRegister
} from '@/application/usecases'
import {
  EventRepositoryDatabase,
  UserRepositoryDatabase
} from './infra/repositories/database'
import {
  GenerateLocalSlugGateway,
  GenerateCryptoId,
  GenerateJwtToken
} from './infra/gateways'
import { PrismaClient } from '@prisma/client'

async function init() {
  const prisma = new PrismaClient()

  const eventRepository = new EventRepositoryDatabase(prisma)
  const userRepository = new UserRepositoryDatabase(prisma)
  const generateIdGateway = new GenerateCryptoId()
  const generateSlugGateway = new GenerateLocalSlugGateway()
  const generateTokenGateway = new GenerateJwtToken()

  const event = new EventCreate(
    eventRepository,
    userRepository,
    generateIdGateway,
    generateSlugGateway
  )
  const eventByUser = new GetUserEvent(userRepository, eventRepository)
  const getUsers = new GetUsers(userRepository)
  const getUser = new GetUser(userRepository)
  const getEvent = new GetEvent(eventRepository)
  const getEvents = new GetEvents(eventRepository)
  const subscribe = new EventSubscribe(eventRepository, userRepository)
  const eventUpdate = new EventUpdateStatus(eventRepository, userRepository)
  const follow = new Follow(userRepository)
  const authentication = new UserAuthentication(
    userRepository,
    generateTokenGateway
  )
  const register = new UserRegister(userRepository, generateIdGateway)

  const httpServer = new ExpressAdapter()

  new RestController(
    httpServer,
    event,
    eventByUser,
    getUsers,
    getUser,
    getEvent,
    getEvents,
    subscribe,
    eventUpdate,
    follow,
    authentication,
    register
  )
  httpServer.listen(3000)
}

init()
import {
  EventCreate,
  EventSubscribe,
  EventUpdate,
  EventUpdateStatus,
  Follow,
  GetEvent,
  GetEventBySlug,
  GetEvents,
  GetUser,
  GetUsers,
  UserAuthentication,
  UserRegister,
  UserUpdate
} from '@/application/usecases'
import { GetUserEvent } from '@/application/usecases/get-user-event'
import { HttpServer } from '@/infra/http/http-server'
import { auth } from '../middleware/auth'

export class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly event: EventCreate,
    readonly eventByUser: GetUserEvent,
    readonly getUsers: GetUsers,
    readonly getUser: GetUser,
    readonly getEvent: GetEvent,
    readonly getEventBySlug: GetEventBySlug,
    readonly getEvents: GetEvents,
    readonly subscribe: EventSubscribe,
    readonly eventUpdateStatus: EventUpdateStatus,
    readonly eventUpdate: EventUpdate,
    readonly userUpdate: UserUpdate,
    readonly follow: Follow,
    readonly authentication: UserAuthentication,
    readonly register: UserRegister
  ) {
    httpServer.on('get', '/', async function (params: any, body: any) {
      return { message: 'Hello World' }
    })
    httpServer.on(
      'post',
      '/event',
      async function (params: any, body: any) {
        await event.execute(body)
        return
      },
      auth
    )

    httpServer.on(
      'put',
      '/event',
      async function (params: any, body: any) {
        await eventUpdate.execute(body)
        return
      },
      auth
    )

    httpServer.on(
      'get',
      '/user/:id',
      async function (params: any, body: any) {
        const user = await getUser.execute({ userId: params.id })
        return user
      },
      auth
    )

    httpServer.on(
      'put',
      '/user',
      async function (params: any, body: any) {
        const user = await userUpdate.execute(body)
        return user
      },
      auth
    )

    httpServer.on(
      'get',
      '/users',
      async function (params: any, body: any) {
        const users = await getUsers.execute()
        return users
      },
      auth
    )

    httpServer.on(
      'get',
      '/event/:id',
      async function (params: any, body: any) {
        const event = await getEvent.execute({ eventId: params.id })
        return event
      },
      auth
    )

    httpServer.on(
      'get',
      '/event/slug/:slug',
      async function (params: any, body: any) {
        const event = await getEventBySlug.execute({ slug: params.slug })
        return event
      },
      auth
    )

    httpServer.on(
      'get',
      '/events',
      async function (params: any, body: any) {
        const events = await getEvents.execute()
        return events
      },
      auth
    )

    httpServer.on(
      'post',
      '/subscribe',
      async function (params: any, body: any) {
        await subscribe.execute(body)
        return
      }
    )

    httpServer.on(
      'patch',
      '/event',
      async function (params: any, body: any) {
        await eventUpdateStatus.execute(body)
        return
      },
      auth
    )

    httpServer.on(
      'post',
      '/follow',
      async function (params: any, body: any) {
        await follow.execute(body)
        return
      },
      auth
    )

    httpServer.on(
      'post',
      '/authentication',
      async function (params: any, body: any) {
        const token = await authentication.execute(body)
        return { token }
      }
    )

    httpServer.on('post', '/register', async function (params: any, body: any) {
      await register.execute(body)
    })
  }
}

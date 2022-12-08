import { Event, User } from '@/domain/entities'
import { EventIdNotFound, InvalidEnrollment } from '@/domain/errors'
import { EventRepository } from '@/domain/repositories'

export class EventRepositoryMemory implements EventRepository {
  private events: Event[] = []

  constructor() {}

  async updateSubscribers(eventId: string, user: User): Promise<void> {
    const event = this.events.find((event) => event.eventId === eventId)
    if (!event) throw new EventIdNotFound()
    const hasUser = event.subscriptions.find(
      (sub: User) => sub.userId === user.userId
    )
    if (hasUser) throw new InvalidEnrollment()
    event.subscriptions.push(user)
  }

  async updateEventStatus(eventId: string): Promise<void> {
    if (!eventId) throw new EventIdNotFound()
    const event = this.events.find((event) => event.eventId === eventId)
    if (!event) throw new EventIdNotFound()
    event.finishEvent()
  }

  async findAll(): Promise<Event[]> {
    return this.events
  }

  async findOneById(eventId: string): Promise<Event> {
    const event = this.events.find((event) => event.eventId === eventId)
    if (!event) throw new EventIdNotFound()
    return event
  }

  async findByUserId(userId: string): Promise<Event[]> {
    const event = this.events.filter((event) => event.ownerId === userId)
    return event
  }

  async save(event: Event): Promise<void> {
    this.events.push(event)
  }
}

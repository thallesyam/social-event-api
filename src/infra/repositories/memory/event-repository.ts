import { Event } from '@/domain/entities'
import { EventIdNotFound } from '@/domain/errors'
import { EventRepository } from '@/domain/repositories'

export class EventRepositoryMemory implements EventRepository {
  private events: Event[] = []

  constructor() {}

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

import { Event } from '@/domain/entities'
import { EventRepository } from '@/domain/repositories'

export class EventRepositoryMemory implements EventRepository {
  events: Event[] = []

  constructor() {}

  async findAll(): Promise<Event[]> {
    return this.events
  }
  async save(event: Event): Promise<void> {
    this.events.push(event)
  }
}

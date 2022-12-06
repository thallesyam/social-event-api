import { Event } from '../entities'

export interface EventRepository {
  findAll(): Promise<Event[]>
  save(event: Event): Promise<void>
  findOneById(eventId: string): Promise<Event>
}

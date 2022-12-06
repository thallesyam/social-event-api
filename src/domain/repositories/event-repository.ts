import { Event } from '@/domain/entities'

export interface EventRepository {
  findAll(): Promise<Event[]>
  save(event: Event): Promise<void>
  findOneById(eventId: string): Promise<Event>
  findByUserId(userId: string): Promise<Event[]>
}

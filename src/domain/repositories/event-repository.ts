import { Event } from '@/domain/entities'

export interface EventRepository {
  findAll(): Promise<Event[]>
  save(event: Event): Promise<void>
  findOneById(eventId: string): Promise<Event>
  findOneByUserId(userId: string): Promise<Event[]>
}

import { Event, User } from '@/domain/entities'

export interface EventRepository {
  findAll(): Promise<Event[]>
  save(event: Event): Promise<void>
  updateEventStatus(eventId: string): Promise<void>
  updateEvent(eventId: string, updateData: any): Promise<void>
  updateSubscribers(eventId: string, user: User): Promise<void>
  findOneById(eventId: string): Promise<Event>
  findByUserId(userId: string): Promise<Event[]>
}

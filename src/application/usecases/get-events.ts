import { EventRepository } from '@/domain/repositories'
import { Event } from '@/domain/entities'

export class GetEvents {
  constructor(readonly eventRepository: EventRepository) {}

  async execute(): Promise<Event[]> {
    const events = await this.eventRepository.findAll()
    return events
  }
}

import { EventRepository } from '@/domain/repositories'
import { Event } from '@/domain/entities'

export class GetEvent {
  constructor(readonly eventRepository: EventRepository) {}

  async execute(input: Input): Promise<Event> {
    const event = await this.eventRepository.findOneById(input.eventId)
    return event
  }
}

type Input = {
  eventId: string
}

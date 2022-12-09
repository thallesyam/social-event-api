import { EventRepository } from '@/domain/repositories'
import { Event } from '@/domain/entities'

export class GetEventBySlug {
  constructor(readonly eventRepository: EventRepository) {}

  async execute(input: Input): Promise<Event> {
    const event = await this.eventRepository.findOneBySlug(input.slug)
    return event
  }
}

type Input = {
  slug: string
}

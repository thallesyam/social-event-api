import { EventRepository, UserRepository } from '@/domain/repositories'

export class EventSubscribe {
  constructor(
    readonly eventRepository: EventRepository,
    readonly userRepository: UserRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const event = await this.eventRepository.findOneById(input.eventId)
    const user = await this.userRepository.findOneById(input.subscriberId)

    await this.eventRepository.updateSubscribers(event.eventId, user)
  }
}

type Input = {
  subscriberId: string
  eventId: string
}

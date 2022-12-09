import { UserNotPermission } from '@/domain/errors'
import { EventRepository, UserRepository } from '@/domain/repositories'

export class EventUpdateStatus {
  constructor(
    readonly eventRepository: EventRepository,
    readonly userRepository: UserRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.findOneById(input.ownerId)
    const event = await this.eventRepository.findOneById(input.eventId)
    if (user.userId !== event.ownerId) throw new UserNotPermission()
    await this.eventRepository.updateEventStatus(event.eventId)
  }
}

type Input = {
  eventId: string
  ownerId: string
}

import { UserNotPermission } from '@/domain/errors'
import { EventRepository, UserRepository } from '@/domain/repositories'

export class EventUpdate {
  constructor(
    readonly eventRepository: EventRepository,
    readonly userRepository: UserRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.findOneById(input.ownerId)
    const event = await this.eventRepository.findOneById(input.eventId)
    if (user.userId !== event.ownerId) throw new UserNotPermission()
    delete event.subscriptions
    const data = {
      ...event,
      ...input.updateData
    }
    await this.eventRepository.updateEvent(input.eventId, data)
  }
}

type Input = {
  eventId: string
  ownerId: string
  updateData: {
    eventName?: string
    slug?: string
    description?: string
    eventDate?: Date
    paymentKey?: string
    price?: number
    modality?: string
    address?: string
    closureDate?: Date
    additionalInfo?: string
  }
}

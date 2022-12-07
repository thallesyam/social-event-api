import { Event } from '@/domain/entities'
import { EventRepository, UserRepository } from '@/domain/repositories'

export class GetUserEvent {
  constructor(
    readonly userRepository: UserRepository,
    readonly eventRepository: EventRepository
  ) {}

  async execute(input: Input): Promise<Event[]> {
    const user = await this.userRepository.findOneById(input.userId)
    const events = await this.eventRepository.findByUserId(user.userId)
    return events
  }
}

type Input = {
  userId: string
}

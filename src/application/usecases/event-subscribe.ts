import {
  EnrollmentRepository,
  EventRepository,
  UserRepository
} from '@/domain/repositories'
import { GenerateIdGateway } from '@/application/gateways'
import { Enrollment } from '@/domain/entities'

export class EventSubscribe {
  constructor(
    readonly eventRepository: EventRepository,
    readonly userRepository: UserRepository,
    readonly enrollmentRepository: EnrollmentRepository,
    readonly generateIdGateway: GenerateIdGateway
  ) {}

  async execute(input: Input): Promise<void> {
    const enrollmentId = await this.generateIdGateway.generate()
    const user = await this.userRepository.findOneById(input.ownerId)
    const event = await this.eventRepository.findOneById(input.eventId)
    const enrollmentHasExists = await this.enrollmentRepository.findByEventId(
      event.eventId
    )
    if (!enrollmentHasExists) {
      await this.enrollmentRepository.save(
        new Enrollment(enrollmentId, event.eventId, user.userId)
      )
      return
    }

    await this.enrollmentRepository.updateSubscribers(
      event.eventId,
      user.userId
    )
  }
}

type Input = {
  ownerId: string
  eventId: string
}
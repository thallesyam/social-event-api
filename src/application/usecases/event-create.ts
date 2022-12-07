import { EventRepository, UserRepository } from '@/domain/repositories'
import { Event } from '@/domain/entities'
import { GenerateIdGateway, GenerateSlugGateway } from '@/application/gateways'
import { UserNotPermission } from '@/domain/errors'

export class EventCreate {
  constructor(
    readonly eventRepository: EventRepository,
    readonly userRepository: UserRepository,
    readonly generateIdGateway: GenerateIdGateway,
    readonly generateSlugGateway: GenerateSlugGateway
  ) {}

  async execute(input: Input): Promise<void> {
    const eventId = await this.generateIdGateway.generate()
    const eventSlug = await this.generateSlugGateway.generate(input.eventName)
    const user = await this.userRepository.findOneById(input.ownerId)
    const events = await this.eventRepository.findByUserId(user.userId)

    if (!user.getIsPayingUser() && !!events?.length) {
      throw new UserNotPermission()
    }

    const event = new Event(
      eventId,
      input.ownerId,
      input.eventName,
      eventSlug,
      input.description,
      input.eventDate,
      input.paymentKey,
      input.price,
      input.modality && input.modality,
      input.address && input.address,
      input.closureDate && input.closureDate,
      input.additionalInfo && input.additionalInfo
    )

    await this.eventRepository.save(event)
  }
}

type Input = {
  ownerId: string
  eventName: string
  description: string
  eventDate: Date
  paymentKey: string
  price: number
  modality?: string
  address?: string
  closureDate?: Date
  additionalInfo?: string
}

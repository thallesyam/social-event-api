import { EventRepository } from '@/domain/repositories'
import { Event } from '@/domain/entities'
import { GenerateIdGateway } from '@/application/gateways'

export class EventCreate {
  constructor(
    readonly eventRepository: EventRepository,
    readonly generateIdGateway: GenerateIdGateway
  ) {}

  async execute(input: Input): Promise<void> {
    const eventId = await this.generateIdGateway.generate()

    const event = new Event(
      eventId,
      input.ownerId,
      input.eventName,
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

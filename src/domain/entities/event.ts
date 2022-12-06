import { InvalidEvent } from '@/domain/errors'

export class Event {
  readonly createdAt = new Date()

  constructor(
    readonly eventId: string,
    readonly ownerId: string,
    readonly eventName: string,
    readonly description: string,
    readonly eventDate: Date,
    readonly paymentKey: string,
    readonly price: number,
    readonly modality: string = 'remote',
    readonly address?: string,
    readonly closureDate?: Date,
    readonly additionalInfo?: string
  ) {
    if (!eventName || !description || !eventDate || !paymentKey || !price) {
      throw new InvalidEvent()
    }
  }
}

import { InvalidEvent } from '@/domain/errors'

export class Event {
  status = true
  subscriptions: any = []

  constructor(
    readonly eventId: string,
    readonly ownerId: string,
    readonly eventName: string,
    readonly slug: string,
    readonly description: string,
    readonly eventDate: Date,
    readonly paymentKey: string,
    readonly price: number,
    readonly modality: string = 'remote',
    readonly address?: string,
    readonly closureDate?: Date,
    readonly additionalInfo?: string
  ) {
    if (
      !eventName ||
      !description ||
      !eventDate ||
      eventDate < new Date() ||
      !paymentKey ||
      !price
    ) {
      throw new InvalidEvent()
    }
  }

  finishEvent() {
    this.status = false
  }

  getStatus() {
    return this.status
  }
}

import { InvalidEvent } from '../errors'

export class Event {
  private subscribers: string[] = []
  readonly createdAt = new Date()

  constructor(
    readonly eventId: string,
    readonly ownerId: string,
    readonly eventName: string,
    readonly description: string,
    readonly eventDate: Date,
    readonly paymentKey: string,
    readonly price: number,
    readonly modality: 'onSite' | 'remote' = 'remote',
    readonly address?: string,
    readonly closureDate?: Date,
    readonly additionalInfo?: string
  ) {
    if (
      !ownerId ||
      !eventName ||
      !description ||
      !eventDate ||
      !paymentKey ||
      !price
    ) {
      throw new InvalidEvent()
    }
  }

  getSubscribers() {
    return this.subscribers
  }

  setSubscribers(userId: string) {
    return this.subscribers.push(userId)
  }
}

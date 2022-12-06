import { InvalidSubscription } from '../errors'

export class Subscription {
  subscribers: string[] = []

  constructor(readonly eventId: string) {
    if (!eventId) {
      throw new InvalidSubscription()
    }
  }
}

import { InvalidEnrollment } from '@/domain/errors'

export class Enrollment {
  subscriptions: string[] = []

  constructor(
    readonly enrollmentId: string,
    readonly eventId: string,
    readonly ownerId: string
  ) {
    if (!eventId || !ownerId || !enrollmentId) {
      throw new InvalidEnrollment()
    }
  }
}

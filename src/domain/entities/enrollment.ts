import { InvalidEnrollment } from '@/domain/errors'

export class Enrollment {
  subscriptions: string[] = []

  constructor(readonly enrollmentId: string, readonly eventId: string) {
    if (!eventId || !enrollmentId) {
      throw new InvalidEnrollment()
    }
  }
}

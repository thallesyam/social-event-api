import { InvalidEnrollment } from '../errors'

export class Enrollment {
  enrollments: string[] = []

  constructor(readonly eventId: string, readonly ownerId: string) {
    if (!eventId || !ownerId) {
      throw new InvalidEnrollment()
    }
  }
}

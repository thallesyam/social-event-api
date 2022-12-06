import { InvalidEnrollment } from '../errors'

export class Enrollment {
  enrollments: string[] = []

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

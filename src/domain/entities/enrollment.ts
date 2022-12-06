import { InvalidEnrollment } from '../errors'

export class Enrollment {
  enrollments: string[] = []

  constructor(readonly eventId: string) {
    if (!eventId) {
      throw new InvalidEnrollment()
    }
  }
}

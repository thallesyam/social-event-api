import { Enrollment } from '@/domain/entities'
import { InvalidEnrollment } from '@/domain/errors'
import { EnrollmentRepository } from '@/domain/repositories'

export class EnrollmentRepositoryMemory implements EnrollmentRepository {
  private enrollments: Enrollment[] = []

  constructor() {}

  async findByEventId(eventId: string): Promise<Enrollment | undefined> {
    const enrollment = this.enrollments.find(
      (event) => event.eventId === eventId
    )
    if (!enrollment) return undefined
    return enrollment
  }

  async updateSubscribers(eventId: string, userId: string): Promise<void> {
    const enrollment = this.enrollments.find(
      (event) => event.eventId === eventId
    )
    if (!enrollment) throw new InvalidEnrollment()
    console.log(enrollment)

    enrollment.subscriptions.push(userId)
  }

  async findAll(): Promise<Enrollment[]> {
    return this.enrollments
  }

  async save(enrollment: Enrollment): Promise<void> {
    this.enrollments.push(enrollment)
  }
}

import { Enrollment } from '@/domain/entities'

export interface EnrollmentRepository {
  findAll(): Promise<Enrollment[]>
  findByEventId(eventId: string): Promise<Enrollment | undefined>
  findBySubscriberId(userId: string): Promise<Enrollment[]>
  updateSubscribers(eventId: string, userId: string): Promise<void>
  save(enrollment: Enrollment): Promise<void>
}

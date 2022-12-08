import { Enrollment } from '@/domain/entities'
import {
  EventIdNotFound,
  InvalidEnrollment,
  UserNotFound
} from '@/domain/errors'
import { EnrollmentRepository } from '@/domain/repositories'
import { PrismaClient } from '@prisma/client'

export class EnrollmentRepositoryDatabase implements EnrollmentRepository {
  constructor(readonly prisma: PrismaClient) {}

  async findAll(): Promise<Enrollment[]> {
    const enrollments = await this.prisma.subscription.findMany({
      include: {
        Event: { include: { subscriptions: { include: { User: true } } } },
        User: true
      }
    })
    return enrollments as unknown as Enrollment[]
  }

  async findByEventId(eventId: string): Promise<Enrollment | undefined> {
    const enrollment = await this.prisma.subscription.findMany({
      where: { eventId },
      include: {
        Event: { include: { subscriptions: { include: { User: true } } } },
        User: true
      }
    })

    if (!enrollment) throw new InvalidEnrollment()

    return enrollment as unknown as Enrollment
  }

  async findBySubscriberId(userId: string): Promise<Enrollment[]> {
    const enrollment = await this.prisma.subscription.findMany({
      where: { userId },
      include: {
        Event: { include: { subscriptions: { include: { User: true } } } },
        User: true
      }
    })
    return enrollment as unknown as Enrollment[]
  }

  async updateSubscribers(eventId: string, userId: string): Promise<void> {
    const user = await this.prisma.user.findFirst({ where: { userId } })
    console.log('updateSubscribers', userId)

    if (!user) throw new UserNotFound()
    await this.prisma.subscription.create({
      data: {
        userId: user.userId,
        eventId
      }
    })
  }

  async save(enrollment: Enrollment): Promise<void> {}
}

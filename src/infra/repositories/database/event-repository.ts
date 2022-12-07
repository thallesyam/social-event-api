import { PrismaClient } from '@prisma/client'
import { Event } from '@/domain/entities'
import { EventRepository } from '@/domain/repositories'
import { EventIdNotFound } from '@/domain/errors'

export class EventRepositoryDatabase implements EventRepository {
  constructor(readonly prisma: PrismaClient) {}

  async findAll(): Promise<Event[]> {
    const events = await this.prisma.event.findMany()
    return events as unknown as Event[]
  }

  async save(event: Event): Promise<void> {
    await this.prisma.event.create({ data: event })
  }

  async updateEventStatus(eventId: string): Promise<void> {
    if (!eventId) throw new EventIdNotFound()
    const event = await this.prisma.event.findUnique({ where: { eventId } })
    if (!event) throw new EventIdNotFound()
    await this.prisma.event.update({
      where: { eventId },
      data: { status: false }
    })
  }

  async findOneById(eventId: string): Promise<Event> {
    const event = await this.prisma.event.findUnique({ where: { eventId } })
    if (!event) throw new EventIdNotFound()
    return event as unknown as Event
  }

  async findByUserId(userId: string): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      where: { ownerId: userId }
    })
    return events as unknown as Event[]
  }
}

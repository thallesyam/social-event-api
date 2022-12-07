import { PrismaClient } from '@prisma/client'
import { Event, User } from '@/domain/entities'
import { EventRepository } from '@/domain/repositories'

export class EventRepositoryDatabase implements EventRepository {
  constructor(readonly prisma: PrismaClient) {}

  async findAll(): Promise<Event[]> {
    const events = await this.prisma.event.findMany()
    return events as unknown as Event[]
  }

  async save(event: Event): Promise<void> {
    await this.prisma.event.create({ data: event })
  }
  updateEventStatus(eventId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findOneById(eventId: string): Promise<Event> {
    throw new Error('Method not implemented.')
  }
  async findByUserId(userId: string): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      where: { ownerId: userId }
    })
    return events as unknown as Event[]
  }
  addUserOnEvent(eventId: string, user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

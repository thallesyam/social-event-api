import { InvalidUser } from '@/domain/errors'

export class User {
  private isPayingUser = false
  readonly createdAt = new Date()
  readonly organizeEvents: string[] = []
  readonly associateEvents: string[] = []
  readonly followers: string[] = []
  readonly following: string[] = []

  constructor(
    readonly userId: string,
    readonly name: string,
    readonly email: string,
    readonly image: string,
    readonly password: string
  ) {
    if (!name || !email || !image || !password) {
      throw new InvalidUser()
    }
  }

  getIsPayingUser() {
    return this.isPayingUser
  }

  setIsPayingUser(isPayingUser: boolean) {
    this.isPayingUser = isPayingUser
  }

  setOrganizeEvent(eventId: string) {
    this.organizeEvents.push(eventId)
  }

  setAssociateEvent(eventId: string) {
    this.associateEvents.push(eventId)
  }

  setFollower(userId: string) {
    this.followers.push(userId)
  }
  setFollowing(userId: string) {
    this.following.push(userId)
  }
}

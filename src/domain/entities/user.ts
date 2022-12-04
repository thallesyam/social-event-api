import { InvalidUser } from '@/domain/errors'

export class User {
  private isPayingUser = false
  readonly createdAt = new Date()
  readonly updatedAt = new Date()

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
}

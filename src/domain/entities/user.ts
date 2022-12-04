import { InvalidUser } from '@/domain/errors'

export class User {
  private isPayingUser = false

  constructor(
    readonly name: string,
    readonly email: string,
    readonly image: string,
    readonly password: string,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date()
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

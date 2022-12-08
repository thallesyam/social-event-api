import { InvalidUser } from '@/domain/errors'

export class User {
  isPayingUser = false
  followers: any = []
  following: any = []

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

  setIsPayingUser() {
    this.isPayingUser = true
  }
}

export class UserNotFound extends Error {
  constructor() {
    super('Email e/ou senha inválido(s)')
    this.name = 'UserNotFound'
  }
}

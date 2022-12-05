export class UserNotFound extends Error {
  constructor() {
    super('Email e ou Senha inválido.')
    this.name = 'UserNotFound'
  }
}

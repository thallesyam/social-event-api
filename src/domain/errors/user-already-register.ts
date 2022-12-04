export class UserAlreadyRegister extends Error {
  constructor() {
    super('Email já cadastrado na plataforma.')
    this.name = 'UserAlreadyRegister'
  }
}

export class UserIdNotFound extends Error {
  constructor() {
    super('Usuário com o id informado não foi encontrado')
    this.name = 'UserIdNotFound'
  }
}

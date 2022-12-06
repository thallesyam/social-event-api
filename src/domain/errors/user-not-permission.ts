export class UserNotPermission extends Error {
  constructor() {
    super(
      'Um usuário sen a licença de administrador só pode ter um evento aberto.'
    )
    this.name = 'UserNotPermission'
  }
}

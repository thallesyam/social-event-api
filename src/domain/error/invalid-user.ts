export class InvalidUser extends Error {
  constructor() {
    super(
      'Usuário invalido, por favor verifique se todas as informações estão preenchidas corretamente.'
    )
    this.name = 'InvalidUser'
  }
}

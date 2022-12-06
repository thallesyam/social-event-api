export class InvalidSubscription extends Error {
  constructor() {
    super(
      'Ocorreu um erro na inscrição, verifique se os dados do evento e do usuário foram corretamente preenchidos'
    )
    this.name = 'InvalidSubscription'
  }
}

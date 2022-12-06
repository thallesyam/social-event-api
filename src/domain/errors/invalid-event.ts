export class InvalidEvent extends Error {
  constructor() {
    super(
      'Evento invalido, por favor verifique se todas as informações estão preenchidas corretamente.'
    )
    this.name = 'InvalidEvent'
  }
}

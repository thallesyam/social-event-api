export class EventIdNotFound extends Error {
  constructor() {
    super('Evento com o id informado não foi encontrado')
    this.name = 'EventNotFound'
  }
}

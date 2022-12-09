export class EventSlugNotFound extends Error {
  constructor() {
    super('Evento com o slug informado não foi encontrado')
    this.name = 'EventSlugNotFound'
  }
}

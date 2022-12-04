import crypto from 'crypto'
import { GenerateIdGateway } from '@/application/gateways'

export class GenerateCryptoId implements GenerateIdGateway {
  constructor() {}

  async generate(): Promise<string> {
    const id = crypto.randomUUID()
    return id
  }
}

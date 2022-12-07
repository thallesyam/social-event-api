import { GenerateSlugGateway } from '@/application/gateways'

export class GenerateLocalSlugGateway implements GenerateSlugGateway {
  constructor() {}

  async generate(text: string): Promise<string> {
    const slug = text.toLowerCase().replaceAll(' ', '-')
    return slug
  }
}

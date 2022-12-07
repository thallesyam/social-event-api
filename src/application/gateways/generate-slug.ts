export interface GenerateSlugGateway {
  generate(text: string): Promise<string>
}

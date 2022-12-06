export interface GenerateTokenGateway {
  sign(payload: any, options?: { expiresIn: string }): Promise<string>
}

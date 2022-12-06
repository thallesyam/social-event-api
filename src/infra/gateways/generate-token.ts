import { sign as jwtSign } from 'jsonwebtoken'
import { GenerateTokenGateway } from '@/application/gateways'

const JWT_TOKEN = 'event-management-server'

export class GenerateToken implements GenerateTokenGateway {
  async sign(
    payload: any,
    options?: { expiresIn: string } | undefined
  ): Promise<string> {
    const token = jwtSign(payload, JWT_TOKEN, options)
    return token
  }
}

import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

const JWT_TOKEN = 'event-management-server'

type RequestExtended = Request & {
  userId: string
}

export async function auth(
  request: RequestExtended,
  response: Response,
  next: NextFunction
) {
  try {
    const headers = request.headers.authorization

    if (headers) {
      const token = headers.split(' ')[1]
      const user: any = verify(token, JWT_TOKEN)
      const parseUser = JSON.parse(user.user)
      response.setHeader('userId', parseUser[0].userId)
    } else {
      return response.json({ message: 'Error' }).end()
    }
  } catch (error) {
    return response.json({ message: 'Error' }).end()
  }
}

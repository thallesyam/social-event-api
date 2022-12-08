import express from 'express'
import { HttpServer } from '@/infra/http/http-server'
import cors from 'cors'
import { auth } from '../middleware/auth'
export class ExpressAdapter implements HttpServer {
  app: any

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(async (req: any, res: any, next: any) => {
      await auth(req, res, next)
      next()
    })
    this.app.use(cors())
  }

  listen(port: number): void {
    this.app.listen(port)
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async (req: any, res: any) => {
      const output = await callback(req.params, req.body)
      res.json(output)
    })
  }
}

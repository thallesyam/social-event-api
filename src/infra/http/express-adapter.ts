import express from 'express'
import { HttpServer } from '@/infra/http/http-server'
import cors from 'cors'
export class ExpressAdapter implements HttpServer {
  app: any

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())
  }

  listen(port: number): void {
    this.app.listen(port)
  }

  on(method: string, url: string, callback: Function, middleware?: any): void {
    if (middleware) {
      this.app[method](url, middleware, async (req: any, res: any) => {
        const output = await callback(req.params, req.body)
        res.json(output)
      })
      return
    }

    this.app[method](url, async (req: any, res: any) => {
      const output = await callback(req.params, req.body)
      res.json(output)
    })
  }
}

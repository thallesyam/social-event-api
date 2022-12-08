export interface HttpServer {
  listen(port: number): void
  on(method: string, url: string, callback: Function, middleware?: any): void
}

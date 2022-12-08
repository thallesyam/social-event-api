export default interface HttpServer {
  listen(port: number): void
  on(method: string, url: string, callback: Function): void
}

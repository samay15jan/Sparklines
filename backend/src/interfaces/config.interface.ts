import type { Endpoint } from './endpoint.interface'

export interface Config {
  env: string
  server: {
    host: string
    port: number
  }
  mongodbURI: string
  secretKey: string
  cloudinary: {
    name: string
    api: number
    secret: string
  }
  log: {
    format: 'combined' | 'common' | 'dev' | 'short' | 'tiny'
    level: 'error' | 'warn' | 'info' | 'http' | 'debug'
  }
  enableRateLimit: boolean
  baseURL: string
  endpoint: Endpoint
}

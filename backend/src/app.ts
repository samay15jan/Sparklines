import {} from 'dotenv/config'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import timeout from 'express-timeout-handler'
import { rateLimiterMiddleware } from './middlewares/limiter.middleware'
import { errorMiddleware } from './middlewares/error.middleware'
import { logger } from './utils/logger'
import { getConfig } from './configs'
import { connectDB } from './database/db'
import type { Request, Response } from 'express'
import type { Config } from './interfaces/config.interface'
import type { Route } from './interfaces/route.interface'

export class App {
  public app: express.Application
  public port: number
  public config: Config
  public env: string
  public mongodb: string

  constructor(routes: Route[]) {
    this.config = getConfig()
    this.app = express()
    this.env = this.config.env
    this.port = this.config.server.port
    this.mongodb = this.config.mongodbURI

    connectDB(this.mongodb)
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeRouteFallback()
    this.initializeErrorHandling()
  }
  
  private initializeMiddlewares() {
    const allowedOrigins = [
      'https://sparklines.vercel.app',
      'https://sparklines.samay15jan.xyz',
      'http://localhost:3000'
    ];
  
    this.app.use(morgan(this.config.log.format))
    this.app.use(cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, origin);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'userId', 'Authorization'],
    }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(rateLimiterMiddleware)
    // vercel has timeout limit of 10sec on hobby plan, this allows to throw an error before vercel times out
    this.app.use(
      timeout.handler({
        timeout: 9500,
        onTimeout(req: Request, res: Response) {
          res.status(503).json({
            status: 'FAILED',
            message: 'request timeout',
            data: null,
          })
        },
      })
    )
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router)
    })
  }

  private initializeRouteFallback() {
    this.app.use((req, res) => {
      res.status(404).json({
        status: 'FAILED',
        message: 'route not found, please check documentation at https://docs.saavn.me',
        data: null,
      })
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Server listening on ${this.port}`)
    })
  }

  public getServer() {
    return this.app
  }
}

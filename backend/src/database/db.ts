import mongoose from 'mongoose'
import { logger } from '../utils/logger'

export async function connectDB(mongodb: string) {
  try {
    await mongoose.connect(mongodb)
    logger.info('Connected to MongoDB successfully')
  } catch (error) {
    logger.info(`Error connecting to MongoDB : ${error}`)
  }
}

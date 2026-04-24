import mongoose from 'mongoose'

function sanitizeMongoUri(uri) {
  if (!uri) return 'MONGODB_URI is missing'
  return uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')
}

const CONNECTION_OPTIONS = {
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
  socketTimeoutMS: 15000,
  maxPoolSize: 10,
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export function getDbErrorMessage(error) {
  const genericMessage = 'Database operation failed'
  if (!error) return genericMessage

  if (process.env.NODE_ENV === 'development') {
    return `${genericMessage}: ${error.message}`
  }

  return genericMessage
}

export function isDbUnavailableError(error) {
  return (
    error?.name === 'MongooseServerSelectionError' ||
    error?.name === 'MongoServerSelectionError' ||
    error?.name === 'MongoNetworkError' ||
    error?.name === 'MongoNetworkTimeoutError'
  )
}

export function getDbErrorStatus(error) {
  return isDbUnavailableError(error) ? 503 : 500
}

export async function mongooseConnect() {
  if (cached.conn) return cached.conn

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is missing')
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, CONNECTION_OPTIONS).catch((error) => {
      cached.promise = null
      console.error('MongoDB connection error:', {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        uri: sanitizeMongoUri(uri),
      })
      throw error
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

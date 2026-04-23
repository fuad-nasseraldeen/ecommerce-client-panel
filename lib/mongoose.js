import mongoose from 'mongoose'

function sanitizeMongoUri(uri) {
  if (!uri) return 'MONGODB_URI is missing'
  return uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')
}

export function getDbErrorMessage(error) {
  const genericMessage = 'Database operation failed'
  if (!error) return genericMessage

  if (process.env.NODE_ENV === 'development') {
    return `${genericMessage}: ${error.message}`
  }

  return genericMessage
}

export async function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise()
  } else {
    const uri = process.env.MONGODB_URI
    try {
      return await mongoose.connect(uri)
    } catch (error) {
      console.error('MongoDB connection error:', {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        uri: sanitizeMongoUri(uri),
      })
      throw error
    }
  }
}

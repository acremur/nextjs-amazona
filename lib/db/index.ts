import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const catched = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (catched.conn) {
    return catched.conn
  }

  if (!MONGODB_URI) throw new Error('MONGO_URI is missing')

  catched.promise = catched.promise || mongoose.connect(MONGODB_URI)
  catched.conn = await catched.promise

  return catched.conn
}

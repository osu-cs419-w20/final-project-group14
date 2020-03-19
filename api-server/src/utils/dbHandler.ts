import dotenv from 'dotenv'
const { MongoClient } = require('mongodb')

dotenv.config()

export const createDB = async () => {
  const uri = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@" + process.env.MONGO_URL + "/test?retryWrites=true&w=majority"
  const client = new MongoClient(uri)
  return client
}
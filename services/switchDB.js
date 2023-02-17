const connectDB = require('./databaseConnection')

/** Switch db on same connection pool
 * @return new connection
 */
module.exports.switchDB = async (dbName, dbSchema) => {
  const mongoose = await connectDB()
  if (mongoose.connection.readyState === 1) {
    const db = mongoose.connection.useDb(dbName, { useCache:true })
    // Prevent from schema re-registration
    if (!Object.keys(db.models).length) {
      dbSchema.forEach((schema, modelName) => {
        db.model(modelName, schema)
      })
    }
    return db
  }
  throw new Error('error')
}

/**
 * @return model from mongoose
 */
 module.exports.getDBModel = async (db, modelName) => {
  return db.model(modelName)
}
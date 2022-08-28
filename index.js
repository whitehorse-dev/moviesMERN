// Here we will connect database and start the server.

import app from './server.js' 
// import app that we have already created.
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

// called asynchronous function main to conncect to MongoDB cluster.

async function main() {
  dotenv.config() 
  
  // load env variables.

  // Here we connected to database of mongo.
  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI)

  const port = process.env.PORT || 8000

  try {
    // After we have connected to the database, we will start our own server.

    await client.connect()
    await ReviewsDAO.injectDB(client)
    await MoviesDAO.injectDB(client)

    app.listen(port, () => {

      var dateAbhi = new Date().toLocaleString()

      console.log('Server is running on port:' + port +' Date now '+ dateAbhi)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main().catch(console.error)

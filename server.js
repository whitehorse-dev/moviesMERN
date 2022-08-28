import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'

const app = express() // server created here

app.use(cors())
app.use(express.json())
// We attached cors and express json that express will use.
// express.json is json parsing middleware to enable server to read and accept json in request's body

// Middlewares are funtions that express executes after getting incoming request and before the output.

// use() function registers middleware with express.

app.use('/api/v1/movies', movies)

// if someone tries to go to route that is not available then * will provide 404 error.
app.use('*', (req, res) => {
  res.status(404).json({ error: 'not found' })
})

export default app

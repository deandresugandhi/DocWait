import express from 'express'
import cors from 'cors'

const app = express()

// Middleware to parse incoming JSON requests
app.use(express.json())

// app.use(cors())



export default app
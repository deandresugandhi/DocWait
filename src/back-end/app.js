import express from 'express'
import cors from 'cors'
import patientsRoutes from './routes/patients_routes'

const app = express()

// Middleware to parse incoming JSON requests
app.use(express.json())
app.use('/patients', patientsRoutes)

// app.use(cors())



export default app
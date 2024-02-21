import express from 'express'
import cors from 'cors'
import patientsRoutes from './routes/patients_routes'

const app = express()

// Middleware to parse incoming JSON requests
app.use(cors())

app.use(express.json())

app.use('/patients', patientsRoutes)

export default app
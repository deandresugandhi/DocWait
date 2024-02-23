import express from 'express'
import cors from 'cors'
import patientsRoutes from './routes/patients_routes.js'
import entriesRoutes from './routes/query_entry_routes.js'
import addressesRoutes from './routes/addresses_routes.js'
import practitioners_routes from './routes/practitioners_routes.js'

const app = express()

// Middleware to parse incoming JSON requests
app.use(cors())

app.use(express.json())

app.use('/patients', patientsRoutes)

app.use('/addresses', addressesRoutes)

app.use('/entries', entriesRoutes)

app.use( '/practitioners',practitioners_routes)

export default app


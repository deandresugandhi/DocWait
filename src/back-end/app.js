import express from 'express'
import cors from 'cors'
import patientsRoutes from './routes/patients_routes.js'
import entriesRoutes from './routes/query_entry_routes.js'
import addressesRoutes from './routes/addresses_routes.js'
import practitionersRoutes from './routes/practitioners_routes.js'
import loginRoutes from './routes/login_routes.js'
import clinicRoutes from './routes/clinics_routes.js'
import openingHoursRoutes from './routes/opening_hours.js'

const app = express()

// Middleware to parse incoming JSON requests
app.use(cors())

app.use(express.json())

app.use('/patients', patientsRoutes)

app.use('/addresses', addressesRoutes)

app.use('/entries', entriesRoutes)

app.use( '/practitioners', practitionersRoutes)

app.use('/login', loginRoutes)

app.use('/clinic', clinicRoutes)

app.use('/opening_hours', openingHoursRoutes)

export default app


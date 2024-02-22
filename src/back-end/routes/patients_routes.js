import { Router } from 'express';
import { PatientModel } from "../db.js";

const router = Router();

// Handle GET request to fetch all patients
router.get('/', async (req, res) => {
    try {
        // Fetch all patients from the database
        const patients = await PatientModel.find().populate('address');

        // Respond with the fetched patients
        res.send(patients);
    } catch (error) {
        
        console.error('Error fetching patients:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Handle GET request to fetch one patient
router.get('/:id', async (req, res) => {
    try {
        const patient = await PatientModel.findById(req.params.id).populate('address');

        if (patient) {
            res.send(patient);
        } else {
            res.status(404).send({ error: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const insertedPatient = await PatientModel.create(req.body).populate('address')
        res.status(201).send(insertedPatient)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default router
import { Router } from 'express';
import { PatientModel } from "../db.js";

const router = Router();

// Handle GET request to fetch all patients
router.get('/', async (req, res) => {
    try {
        // Fetch all patients from the database
        const patients = await PatientModel.find().populate('address')

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

// handle POST request to create a new patient
router.post('/create', async (req, res) => {
    try {
        const insertedPatient = await PatientModel.create(req.body)
        res.status(201).send(insertedPatient)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// handle PUT requests to update patient details
router.put('/:id', async (req, res) => {
    try {                
        const updatePatient = await PatientModel.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
        if (updatePatient) {
            const populatedPatient = await PatientModel.findById(updatePatient._id)
                .populate('address');
            res.send(populatedPatient);
        } else {
            res.status(404).send({ error: 'Patient not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

//handle DELETE requests to remove patient records

router.delete('/:id', async (req, res) => {
    try {
        const deletedPatient = await PatientModel.findByIdAndDelete(req.params.id);
        if (deletedPatient) {
            res.status(200).send({message:'Patient info deletion succesful'})
        } else {
            res.status(404).send({ error: 'patient not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export default router

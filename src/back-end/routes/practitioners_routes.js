import { Router } from 'express';
import { PractitionerModel } from "../db.js";

const router = Router();

// Handle GET request to fetch all practitioners
router.get('/', async (req, res) => {
    try {
        // Fetch all patients from the database
        const practitioners = await PractitionerModel.find()

        // Respond with the fetched patients
        res.send(practitioners);
    } catch (error) {
        
        console.error('Error fetching practitioners', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Handle GET request to fetch one patient
router.get('/:id', async (req, res) => {
    try {
        const practitioner = await PractitionerModel.findById(req.params.id);

        if (practitioner) {
            res.send(practitioner);
        } else {
            res.status(404).send({ error: 'Practitioner not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

//handle POST request to create one practitioner

router.post('/create', async (req, res) => {
    try {
        const insertedPractitioner = await PractitionerModel.create(req.body)
        res.status(201).send(insertedPractitioner)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// handle PUT requests to update patient details
router.put('/:id', async (req, res) => {
    try {                
        const updatePractitioner = await PractitionerModel.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
        if (updatePractitioner) {
            const populatedPractioner = await PractitionerModel.findById(updatePractitioner._id)
            res.send(populatedPractioner);
        } else {
            res.status(404).send({ error: 'Practitioner not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//handle DELETE request to remove practitioner records 
router.delete('/:id', async (req, res) => {
    try {
        const deletedPractitioner = await PractitionerModel.findByIdAndDelete(req.params.id);
        if (deletedPractitioner) {
            res.send(deletedPractitioner)
        } else {
            res.status(404).send({ error: 'Practitioner not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
export default router;

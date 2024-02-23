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

//handle DELETE request to remove practitioner records 
router.delete('/:id', async (req, res) => {
    try {
        const deletedPractitioner = await PractitionerModel.findByIdAndDelete(req.params.id);
        if (deletedPractitioner) {
            res.status(200).send({message:'Practitioner info deletion succesful'})
        } else {
            res.status(404).send({ error: 'Practitioner not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
export default router;
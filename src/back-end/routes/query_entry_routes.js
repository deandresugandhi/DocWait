import { Router } from 'express';
import { QueueEntriesModel } from "../db.js";

const router = Router();

// Handle GET request to fetch all Queue Entries
router.get('/', async (req, res) => {
    try {
        // Fetch all patients from the database
        const queueEntry = await QueueEntriesModel.find()
            .populate('patient')
            .populate('practitioner');

        // Respond with the fetched patients
        res.send(queueEntry);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


// Handle GET request to fetch one Queue Entry
router.get('/:id', async (req, res) => {
    try {
        const queueEntry = await QueueEntriesModel.findById(req.params.id)
            .populate('patient')
            .populate('practitioner');
        if (queueEntry) {
            res.send(queueEntry);
        } else {
            res.status(404).send({ error: 'Entry not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Handle GET request to fetch entry by patient_id

router.get('/patients/:id', async (req, res) => {
    const { id: patientId } = req.params; // Extract patient ID from request parameters 

    try {
        const queueEntries = await QueueEntriesModel.find({ patient: patientId })
            .populate('patient') 
            .populate('practitioner'); 

        if (queueEntries.length === 0) {
            res.status(404).json({ message: 'No queue entries found for this patient' });
        } else {
            res.json(queueEntries);
        }
    } catch (error) {
        console.error('Error fetching queue entries:', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
});

router.post('/', async (req, res) => {
    try {
        const insertedEntry = await QueueEntriesModel.create(req.body)
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {                
        const updateEntry = await QueueEntriesModel.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
        if (updateEntry) {
            const populatedEntry = await QueueEntriesModel.findById(updateEntry._id)
                .populate('patient') 
                .populate('practitioner');
            res.send(populatedEntry);
        } else {
            res.status(404).send({ error: 'Entry not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

//handle DELETE requests to remove queue entry
router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await QueueEntriesModel.findByIdAndDelete(req.params.id);
        if (deletedEntry) {
            res.send(deletedEntry)
        } else {
            res.status(404).send({ error: 'patient not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export default router

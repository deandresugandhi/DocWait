import { Router } from 'express';
import { QueueEntriesModel } from "../db.js";

const router = Router();

// Handle GET request to fetch all Queue Entries
router.get('/', async (req, res) => {
    try {
        // Fetch all patients from the database
        const queueEntry = await QueueEntriesModel.find();

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
        const queueEntry = await QueueEntriesModel.findById(req.params.id);
        if (queueEntry) {
            res.send(queueEntry);
        } else {
            res.status(404).send({ error: 'Entry not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const insertedEntry = await QueryEntriesModel.create(req.body)
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default router
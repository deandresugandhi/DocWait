import { Router } from 'express';
import { OpeningHoursModel } from '../db.js';

const router = Router();

// Handle GET request to fetch opening hours information
router.get('/', async (req, res) => {
    try {
        const openingInfo = await OpeningHoursModel.find()
        res.send(openingInfo);

    } catch (error) {
        console.error('Error fetching opening hours:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// handle PUT requests to update opening hours details
router.put('/:id', async (req, res) => {
    try {
        const updateOpening = await OpeningHoursModel.findOneAndUpdate({_id:req.params.id}, req.body, { new: true })
        if (updateOpening) {
            res.send(updateOpening)
        } else {
            res.status(404).send({ error: 'Openings not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// handle PUT requests to update opening hours based on day
router.put('/:dayOfWeek', async (req, res) => {
    try {
        const updateOpening = await OpeningHoursModel.findOneAndUpdate({day: req.params.dayOfWeek}, req.body, { new: true })
        if (updateOpening) {
            res.send(updateOpening)
        } else {
            res.status(404).send({ error: 'Openings not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const openingEntry = await OpeningHoursModel.findById(req.params.id)
        if (openingEntry) {
            res.send(openingEntry);
        } else {
            res.status(404).send({ error: 'Entry not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/:dayOfWeek', async (req, res) => {
    try {
        const openingEntry = await OpeningHoursModel.find({day: req.params.dayOfWeek})
        if (openingEntry) {
            res.send(openingEntry);
        } else {
            res.status(404).send({ error: 'Entry not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
export default router

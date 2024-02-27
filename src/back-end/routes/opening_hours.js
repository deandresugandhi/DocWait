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
export default router
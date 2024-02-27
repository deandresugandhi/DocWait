import { Router } from 'express';
import { ClinicModel} from "../db.js";

const router = Router();

// Handle GET request to fetch clinic information
router.get('/', async (req, res) => {
    try {
        const clinicInfo = await ClinicModel.find().populate('openingHours');
        // Respond with the fetched patients
        res.send(clinicInfo);
    } catch (error) {
        console.error('Error fetching clinic information:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

export default router
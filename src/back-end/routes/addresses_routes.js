
import { Router } from 'express';
import { AddressModel } from "../db.js";

const router = Router();

// Handle GET request to fetch all patient addresses
router.get('/', async (req, res) => {
    try {
        // Fetch all addresses from the database
        const addresses = await AddressModel.find();

        // Respond with the fetched patients
        res.send(addresses);
    } catch (error) {
        
        console.error('Error fetching addresses ', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Handle GET request to fetch one address
router.get('/:id', async (req, res) => {
    try {
        const address = await AddressModel.findById(req.params.id);

        if (address) {
            res.send(address);
        } else {
            res.status(404).send({ error: 'Address not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// handle POST request to create a new address
router.post('/create', async (req, res) => {
    try {
        const insertedAddress = await AddressModel.create(req.body)
        res.status(201).send(insertedAddress)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// handle PUT requests to update patient details
router.put('/:id', async (req, res) => {
    try {
        const updateAddress = await AddressModel.findOneAndUpdate({_id:req.params.id}, req.body, { new: true })
        if (updateAddress) {
            res.send(updateAddress);
        } else {
            res.status(404).send({ error: 'Address not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// handle DELETE requests to remove address

router.delete('/:id', async (req, res) => {
    try {
        const deletedAddress = await AddressModel.findByIdAndDelete(req.params.id);
        if (deletedAddress) {
            res.status(200).send({message:'Address deletion successful'})
        } else {
            res.status(404).send({ error: 'Address not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


export default router
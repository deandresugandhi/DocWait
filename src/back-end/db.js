import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Configure .env
dotenv.config()

// Connect to MongoDB database via Mongoose
try {
    const m = await mongoose.connect(process.env.DB_URI);
    console.log(m.connection.readyState === 1 ? "Database connected!" : "Database failed to connect");
} catch (err) {
    console.error(err)
}

// Define function to disconnect from database
const closeConnection = () => {
    console.log('Disconnecting...')
    mongoose.disconnect()
}

// Disconnect from database when process in the terminal is interrupted / terminated using ctrl+c 
process.on('SIGINT', async () => {
    try {
        console.log('Disconnecting...');
        mongoose.disconnect();
        console.log('Disconnected from database. Exiting process.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});

const patientsSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: mongoose.ObjectID, ref: 'Address'},
    phoneNumber: {type: String, required: true},
    queueState: {type: String, required: true}
})

const addressesSchema = new mongoose.Schema({
    unitNumber: {type: String, required: true},
    streetNumber: {type: String, required: true},
    streetName: {type: String, required: true},
    suburb: {type: String, required: true},
    state: {type: String, required: true},
    postcode: {type: String, required: true},
    country: {type: String, required: true}
})

const practitionersSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    availability: {type: String, required: true}
})

const imagesSchema = new mongoose.Schema({
    image_url: {type: String, required: true}
})

const queueEntriesSchema = new mongoose.Schema({
    image_url: {type: String, required: true}
})
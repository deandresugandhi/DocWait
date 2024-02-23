import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

try {
    const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? 'MongoDB connected!' : 'MongoDB failed to connect')
}
catch (err) {
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

// Define DB schemas
const clinicsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: mongoose.ObjectId, ref: 'Address'},
    url: {type: String, required: true},
    logo: {type: mongoose.ObjectId, ref: 'Image'},
    openingHours: {type: String, required: true}
})

const patientsSchema = new mongoose.Schema({
    //clinic: {type: mongoose.ObjectID, ref: 'Clinic'},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: mongoose.ObjectId, ref: 'Address'},
    phoneNumber: {type: String, required: true},
    
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
    // clinic: {type: mongoose.ObjectID, ref: 'Clinic'},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    availability: { type: String, enum: ['On duty', 'Off duty'], default: 'On duty' }
});


const imagesSchema = new mongoose.Schema({
    image_url: {type: String, required: true}
})

const queueEntriesSchema = new mongoose.Schema({
    patient : {type: mongoose.ObjectId, ref: 'Patient'},
    practitioner : {type: mongoose.ObjectId, ref: 'Practitioner'},
    time: { type: Date, default: Date.now },
    queueState: { type: String, enum: ['Pending', 'In progress', 'Completed'], default: 'Pending' }
})

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  })


//Define DB models
const ClinicModel = mongoose.model('Clinic', clinicsSchema)

const PatientModel = mongoose.model('Patient', patientsSchema)

const AddressModel = mongoose.model('Address', addressesSchema)

const PractitionerModel = mongoose.model('Practitioner', practitionersSchema)

const ImageModel = mongoose.model('Image', imagesSchema)

const QueueEntriesModel = mongoose.model('QueueEntries', queueEntriesSchema)
///
const UserModel = mongoose.model('User', userSchema)


// Export
export { closeConnection, ClinicModel, PatientModel, AddressModel, PractitionerModel, ImageModel, QueueEntriesModel, UserModel } 
import { AddressModel, PatientModel, QueueEntriesModel, PractitionerModel, UserModel, ClinicModel, ImageModel, closeConnection   } from "./db.js";
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import path from 'path';

const addresses = [
    { 
        unitNumber: '1',
        streetNumber: '249',
        streetName: 'George Street',
        suburb: 'Waterloo',
        state: 'NSW',
        postcode: '2017',
        country: 'Australia'
    },
    { 
        unitNumber: '2',
        streetNumber: '118',
        streetName: 'Epsom Road',
        suburb: 'Zetland',
        state: 'NSW',
        postcode: '2017',
        country: 'Australia'
    },
    { 
        unitNumber: '3',
        streetNumber: '11',
        streetName: 'Koorinda Ave',
        suburb: 'Kensington',
        state: 'NSW',
        postcode: '2033',
        country: 'Australia'
    },
    { 
        unitNumber: '4',
        streetNumber: '84',
        streetName: 'Harcourt Parade',
        suburb: 'Rosebery',
        state: 'NSW',
        postcode: '2018',
        country: 'Australia'
    },
    { 
        unitNumber: '4',
        streetNumber: '45',
        streetName: 'Wyndham st',
        suburb: 'Alexandria',
        state: 'NSW',
        postcode: '2015',
        country: 'Australia'
    }
]

await AddressModel.deleteMany()
console.log('Deleted addresses')
let addressesRef = await AddressModel.insertMany(addresses)
console.log('Added addresses')


const patients = [
    { 
     firstName: 'John',
     lastName: 'Smith', 
     address: addressesRef[0]._id,
     phoneNumber: '0421544658'
    },
    { 
    firstName: 'Michael',
     lastName: 'Jordan',
     address: addressesRef[1]._id,
     phoneNumber: '0421545555'
    },
    { 
     firstName: 'Laura',
     lastName: 'Cordoba',
     address: addressesRef[2]._id,
     phoneNumber: '0421546666'
    },
    { 
     firstName: 'Maria',
     lastName: 'Lopez',
     address: addressesRef[3]._id,
     phoneNumber: '0421547777'
    },
    {
     firstName: 'Simon',
     lastName: 'Rodriguez',
     address: addressesRef[3]._id,
     phoneNumber: '042154888'
    },
];

await PatientModel.deleteMany()
console.log('Deleted patient records')
let patientsRef = await PatientModel.insertMany(patients)
console.log('Added patient records')

const practitioners = [
    {
      firstName: 'Rajesh',
      lastName: 'Patel',
      phoneNumber: '9876543210',
      availability: 'On duty'
    },
    {
      firstName: 'Priya',
      lastName: 'Kumar',
      phoneNumber: '1234567890',
      availability: 'On duty'
    }
  ];

await PractitionerModel.deleteMany()
console.log('Deleted practitioners records')
let practitionersRef = await PractitionerModel.insertMany(practitioners)
console.log('Added practitioners records')

const queueEntries = [
    {
     patient : patientsRef[0]._id,
     practitioner : practitionersRef[0]._id,
     time: new Date(),
     queueState: 'In progress' 
    },
    {
     patient : patientsRef[1]._id,
     practitioner : practitionersRef[1]._id,
     time: new Date(),
     queueState: 'Pending' 
    },
    {
     patient : patientsRef[2]._id,
     practitioner : practitionersRef[1]._id,
     time: new Date(),
     queueState: 'Pending' 
    },
    {
     patient : patientsRef[3]._id,
     practitioner : practitionersRef[0]._id ,
     time: new Date(),
     queueState: 'Pending' 
    },

]

await QueueEntriesModel.deleteMany()
console.log('Deleted all queue entries')
await QueueEntriesModel.insertMany(queueEntries)
console.log('Added queue entries')


const users = [
        {
            username: 'testuser',
            password: 'testpassword'
        }
    ];

 // Hash passwords using bcrypt
const hashedUsers = await Promise.all(users.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10); 
    return { ...user, password: hashedPassword };
}));
             
await UserModel.deleteMany(); 
console.log('Deleted existing users');
await UserModel.insertMany(hashedUsers);
console.log('Added user login details');

const imageUrlPath = 'https://www.waterloomedicalcentre.com.au/landinglogo.png'

const images = [{
    imageUrl: imageUrlPath
}];

await ImageModel.deleteMany(); 
console.log('Deleted clinic logos');
let imagesRef =  await ImageModel.insertMany(images);
console.log('Added clinic logos')

const clinicsInfo= 
    {
        name: 'Waterloo Medical Centre',
        address: addressesRef[4],
        url: 'http://www.waterloomedicalcentre.com.au/',
        logo: imagesRef[0]._id,
        openingHours: 'Mon-Fri: 5:30am-6pm, Sat: 7am-12pm, Sun: Closed'
    }

await ClinicModel.deleteMany(); 
console.log('Deleted clinic information');
await ClinicModel.insertMany(clinicsInfo);
console.log('Added clinic information');

closeConnection()


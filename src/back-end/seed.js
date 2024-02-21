import { AddressModel, PatientModel, closeConnection  } from "./db.js";

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
    }
]

await AddressModel.deleteMany()
console.log('Deleted addresses')
let addressesRef = await AddressModel.insertMany(addresses)
console.log('Added addresses')


const patientsInfo = [
    { 
     firstName: 'John',
     lastName: 'Smith', 
     address: addressesRef[0]._id,
     phoneNumber: '0421544658',
     queueState: 'Completed'
    },
    { 
    firstName: 'Michael',
     lastName: 'Jordan',
     address: addressesRef[1]._id,
     phoneNumber: '0421545555',
     queueState: 'In Queue'
    },
    { 
     firstName: 'Laura',
     lastName: 'Cordoba',
     address: addressesRef[2]._id,
     phoneNumber: '0421546666',
     queueState: 'In Queue'
    },
    { 
     firstName: 'Maria',
     lastName: 'Lopez',
     address: addressesRef[3]._id,
     phoneNumber: '0421547777',
     queueState: 'In Queue'
    },
    {
     firstName: 'Simon',
     lastName: 'Rodriguez',
     address: addressesRef[3]._id,
     phoneNumber: '042154888',
     queueState: 'Serving'
    },
];

await PatientModel.deleteMany()
console.log('Deleted patient records')
await PatientModel.insertMany(patientsInfo)
console.log('Added patient records')

closeConnection()


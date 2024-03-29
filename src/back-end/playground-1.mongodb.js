
// Select the database to use.
use('DocWaitDB');
 
const patients = db.getCollection('patients')

patients.drop()
patients.insertMany([
    { 
        firstName: 'John',
        lastName: 'Smith', 
        address: '123 Main Street',
        phoneNumber: '0421544658',
        queueState: 'Completed'
    },
    { 
        firstName: 'Michael',
        lastName: 'Jordan',
        address: '456 Second Street',
        phoneNumber: '0421545555',
        queueState: 'In Queue'
    },
    { 
        firstName: 'Laura',
        lastName: 'Cordoba',
        address: '123 Main Street',
        phoneNumber: '0421546666',
        queueState: 'In Queue'
    },
    { 
        firstName: 'Maria',
        lastName: 'Lopez',
        address: '123 Main Street',
        phoneNumber: '0421547777',
        queueState: 'In Queue'
    },
    {
        firstName: 'Simon',
        lastName: 'Rodriguez',
        address: '123 Main Street',
        phoneNumber: '042154888',
        queueState: 'Serving'
    }
]);

    
const addresses = db.getCollection('addresses')

addresses.drop()
addresses.insertMany(
    [
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
)



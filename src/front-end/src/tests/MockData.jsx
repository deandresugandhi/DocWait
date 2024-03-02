let mockPatients= [
    {
      "_id": "1",
      "firstName": "John",
      "lastName": "Smith",
      "address": {
        "_id": "1",
        "unitNumber": "1",
        "streetNumber": "249",
        "streetName": "George Street",
        "suburb": "Waterloo",
        "state": "NSW",
        "postcode": "2017",
        "country": "Australia",
        "__v": 0
      },
      "phoneNumber": "0421544658"
    },
    {
      "_id": "2",
      "firstName": "Michael",
      "lastName": "Jordan",
      "address": {
        "_id": "2",
        "unitNumber": "2",
        "streetNumber": "118",
        "streetName": "Epsom Road",
        "suburb": "Zetland",
        "state": "NSW",
        "postcode": "2017",
        "country": "Australia"
      },
      "phoneNumber": "0421545555"
    },
    {
      "_id": "3",
      "firstName": "Laura",
      "lastName": "Cordoba",
      "address": {
        "_id": "3",
        "unitNumber": "3",
        "streetNumber": "11",
        "streetName": "Koorinda Ave",
        "suburb": "Kensington",
        "state": "NSW",
        "postcode": "2033",
        "country": "Australia"
      },
      "phoneNumber": "0421546666"
    },
    {
      "_id": "4",
      "firstName": "Maria",
      "lastName": "Lopez",
      "address": {
        "_id": "4",
        "unitNumber": "4",
        "streetNumber": "84",
        "streetName": "Harcourt Parade",
        "suburb": "Rosebery",
        "state": "NSW",
        "postcode": "2018",
        "country": "Australia"
      },
      "phoneNumber": "0421547777"
    },
    {
      "_id": "5",
      "firstName": "Simon",
      "lastName": "Rodriguez",
      "address": {
        "_id": "5",
        "unitNumber": "4",
        "streetNumber": "84",
        "streetName": "Harcourt Parade",
        "suburb": "Rosebery",
        "state": "NSW",
        "postcode": "2018",
        "country": "Australia",
        "__v": 0
      },
      "phoneNumber": "042154888"
    }
]

let mockPractitioners = [
    {
      "_id": "1",
      "firstName": "Rajesh",
      "lastName": "Patel",
      "phoneNumber": "9876543210",
      "availability": "On duty"
    },
    {
      "_id": "2",
      "firstName": "Priya",
      "lastName": "Kumar",
      "phoneNumber": "1234567890",
      "availability": "On duty"
    }
]

let mockEntries = [
    {
      "_id": "1",
      "patient": {
        "_id": "1",
        "firstName": "John",
        "lastName": "Smith",
        "address": "1",
        "phoneNumber": "0421544658"
      },
      "practitioner": {
        "_id": "1",
        "firstName": "Rajesh",
        "lastName": "Patel",
        "phoneNumber": "9876543210",
        "availability": "On duty"
      },
      "time": "2024-03-02T03:42:04.884Z",
      "queueState": "Completed"
    },
    {
      "_id": "2",
      "patient": {
        "_id": "2",
        "firstName": "Michael",
        "lastName": "Jordan",
        "address": "2",
        "phoneNumber": "0421545555",
        "__v": 0
      },
      "practitioner": {
        "_id": "2",
        "firstName": "Priya",
        "lastName": "Kumar",
        "phoneNumber": "1234567890",
        "availability": "On duty"
      },
      "time": "2024-03-02T03:42:04.884Z",
      "queueState": "Pending"
    },
    {
      "_id": "3",
      "patient": {
        "_id": "3",
        "firstName": "Laura",
        "lastName": "Cordoba",
        "address": "3",
        "phoneNumber": "0421546666"
      },
      "practitioner": {
        "_id": "2",
        "firstName": "Priya",
        "lastName": "Kumar",
        "phoneNumber": "1234567890",
        "availability": "On duty"
      },
      "time": "2024-03-02T03:42:04.884Z",
      "queueState": "Pending"
    },
    {
      "_id": "4",
      "patient": {
        "_id": "4",
        "firstName": "Maria",
        "lastName": "Lopez",
        "address": "4",
        "phoneNumber": "0421547777"
      },
      "practitioner": {
        "_id": "1",
        "firstName": "Rajesh",
        "lastName": "Patel",
        "phoneNumber": "9876543210",
        "availability": "On duty"
      },
      "time": "2024-03-02T03:42:04.884Z",
      "queueState": "In progress"
    }
]

export { mockPatients, mockPractitioners, mockEntries }


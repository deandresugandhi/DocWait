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

let mockClinic = [
{
  "_id": "65e2a00dfeba5336f6627068",
  "name": "Waterloo Medical Centre",
  "address": {
    "_id": "65e2a00cfeba5336f6627045",
    "unitNumber": "4",
    "streetNumber": "45",
    "streetName": "Wyndham st",
    "suburb": "Alexandria",
    "state": "NSW",
    "postcode": "2015",
    "country": "Australia"
  },
  "url": "http://www.waterloomedicalcentre.com.au/",
  "logo": "65e2a00dfeba5336f662705c",
  "openingHours": [
    {
      "_id": "65e2a00dfeba5336f662705f",
      "day": "Monday",
      "isOpen": true,
      "openingTime": "05:30 AM",
      "closingTime": "06:00 PM"
    },
    {
      "_id": "65e2a00dfeba5336f6627060",
      "day": "Tuesday",
      "isOpen": true,
      "openingTime": "05:30 AM",
      "closingTime": "06:00 PM"
    },
    {
      "_id": "65e2a00dfeba5336f6627061",
      "day": "Wednesday",
      "isOpen": true,
      "openingTime": "05:30 AM",
      "closingTime": "06:00 PM"
    },
    {
      "_id": "65e2a00dfeba5336f6627062",
      "day": "Thursday",
      "isOpen": true,
      "openingTime": "05:30 AM",
      "closingTime": "06:00 PM"
    },
    {
      "_id": "65e2a00dfeba5336f6627063",
      "day": "Friday",
      "isOpen": true,
      "openingTime": "05:30 AM",
      "closingTime": "06:00 PM"
    },
    {
      "_id": "65e2a00dfeba5336f6627064",
      "day": "Saturday",
      "isOpen": true,
      "openingTime": "07:00 AM",
      "closingTime": "12:00 PM"
    },
    {
      "_id": "65e2a00dfeba5336f6627065",
      "day": "Sunday",
      "isOpen": false,
      "openingTime": "0000",
      "closingTime": "0000"
    }
  ]
}
]

const mockOpeningHours = [
  {
    "_id": "65e2a00dfeba5336f662705f",
    "day": "Monday",
    "isOpen": true,
    "openingTime": "05:30 AM",
    "closingTime": "06:00 PM",
    "__v": 0
  },
  {
    "_id": "65e2a00dfeba5336f6627060",
    "day": "Tuesday",
    "isOpen": true,
    "openingTime": "05:30 AM",
    "closingTime": "06:00 PM",
    "__v": 0
  },
  {
    "_id": "65e2a00dfeba5336f6627061",
    "day": "Wednesday",
    "isOpen": true,
    "openingTime": "05:30 AM",
    "closingTime": "06:00 PM",
    "__v": 0
  },
  {
    "_id": "65e2a00dfeba5336f6627062",
    "day": "Thursday",
    "isOpen": true,
    "openingTime": "05:30 AM",
    "closingTime": "06:00 PM",
    "__v": 0
  },
  {
    "_id": "65e2a00dfeba5336f6627063",
    "day": "Friday",
    "isOpen": true,
    "openingTime": "05:30 AM",
    "closingTime": "06:00 PM",
    "__v": 0
  },
  {
    "_id": "65e2a00dfeba5336f6627064",
    "day": "Saturday",
    "isOpen": true,
    "openingTime": "07:00 AM",
    "closingTime": "12:00 PM",
    "__v": 0
  },
  {
    "_id": "65e2a00dfeba5336f6627065",
    "day": "Sunday",
    "isOpen": false,
    "openingTime": "0000",
    "closingTime": "0000",
    "__v": 0
  }
]

export { mockPatients, mockPractitioners, mockEntries, mockClinic, mockOpeningHours }


import React, { useState } from 'react'
import '../patientstyles.css'
import PatientNav from './PatientNav'

const PatientQueue = () => {
  const [selectedAppointment, setSelectedAppointment] = useState('');

  const handleButtonClick = (appointmentType) => {
    setSelectedAppointment(appointmentType);
    // You can also add navigation or other logic here
  }

  return (
    <>
        <div className="box custom-padding">
            <h1 className="subtitle is-2 has-text-centered">Clinic Name</h1>
            <hr />
            <h3 className="title is-3 has-text-centered">Appointment Type</h3>
            <div className="buttons has-addons is-centered">
          {['Standard GP Consult', 'Immunisation', 'Vaccination', 'Script', 'Physiotherapy', 'Nurse'].map((type) => (
            <button
              key={type}
              className={`button is-large is-fullwidth ${selectedAppointment === type ? 'is-selected' : ''}`}
              onClick={() => handleButtonClick(type)}
            >
              {type}
            </button>
          ))}
        </div>
            <PatientNav 
              previousPage="/patient" // Route back to the home page
              nextPage="/patient/practicioner" // Route to the select practitioner page
            />
            <div className="code-entry">
              <p>&#169; DocWait</p>
            </div>
        </div>
    </>
  )
}

export default PatientQueue

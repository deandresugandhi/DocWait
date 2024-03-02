import React, { useState } from 'react'
import PatientNav from './PatientNav'
import '../patientstyles.css'

const PatientPracticioner = () => {
  // State to track the selected practitioner
  const [selectedPractitioner, setSelectedPractitioner] = useState('')

  // Function to handle practitioner selection
  const handleButtonClick = (practitioner) => {
    setSelectedPractitioner(practitioner)
  }

  return (
    <>
      <div className="box custom-padding">
          <h1 className="subtitle is-2 has-text-centered">Clinic Name</h1>
          <hr />
          <h3 className="title is-3 has-text-centered">Select Practicioner</h3>
          <div className="buttons has-addons is-centered">
          {['Next Available GP', 'Priya Kumar (GP)', 'Rajesh Patel (GP)', 'Nurse', 'Physiotherapist'].map((type) => (
            <button
              key={type}
              className={`button is-large is-fullwidth ${selectedPractitioner === type ? 'is-selected' : ''}`}
              onClick={() => handleButtonClick(type)}
            >
              {type}
            </button>
          ))}
        </div>
          <PatientNav 
            previousPage="/patient/queue" // Go back to the appointment type page
            nextPage="/patient/time/" // Route to the select time page
          />
          <div className="code-entry">
              <p>&#169; DocWait</p>
          </div>
        </div>
    </>
  )
}

export default PatientPracticioner

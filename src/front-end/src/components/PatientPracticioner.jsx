import React from 'react'
import PatientNav from './PatientNav'
import '../patientstyles.css'

const PatientPracticioner = () => {
  return (
    <>
      <div className="box custom-padding">
          <h1 className="subtitle is-2 has-text-centered">Clinic Name</h1>
          <hr />
          <h3 className="title is-3 has-text-centered">Select Practicioner</h3>
          <div className="buttons has-addons is-centered">
              <button className="button is-large is-fullwidth">Option 1 - Next Available GP</button>
              <button className="button is-large is-fullwidth">Option 2 - Priya Kumar (GP)</button>
              <button className="button is-large is-fullwidth">Option 3 - Rajesh Patel (GP)</button>
              <button className="button is-large is-fullwidth">Option 4 - Nurse</button>
              <button className="button is-large is-fullwidth">Option 5 - Physiotherapist</button>
          </div>
          <PatientNav 
            previousPage="/patient/queue" // Go back to the appointment type page
            nextPage="/patient/time/" // Route to the select time page
          />
          <div className="code-entry">
              <p>&#169; QueueMate</p>
          </div>
        </div>
    </>
  )
}

export default PatientPracticioner

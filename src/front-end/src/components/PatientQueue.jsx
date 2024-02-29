import React from 'react'
import '../patientstyles.css'
import PatientNav from './PatientNav'

const PatientQueue = () => {
  return (
    <>
        <div className="box">
            <h1 className="subtitle is-2 has-text-centered">Clinic Name</h1>
            <hr />
            <h3 className="title is-3 has-text-centered">Appointment Type</h3>
            <div className="buttons has-addons is-centered">
                <button className="button is-large is-fullwidth">Standard GP Consult</button>
                <button className="button is-large is-fullwidth">Immunisation</button>
                <button className="button is-large is-fullwidth">Vaccination</button>
                <button className="button is-large is-fullwidth">Script</button>
                <button className="button is-large is-fullwidth">Physiotherapy</button>
                <button className="button is-large is-fullwidth">Nurse</button>
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

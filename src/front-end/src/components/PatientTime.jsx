import React from 'react'
import '../patientstyles.css'
import PatientNav from './PatientNav'

const PatientTime = () => {
    return (
      <>
        <div className="box custom-padding">
            <h1 className="subtitle is-2 has-text-centered">Clinic Name</h1>
            <hr />
            <h3 className="title is-3 has-text-centered">Select Time</h3>
            <div className="field">
                <label className="label">Current Time</label>
            </div>
            <div className="field is-grouped is-grouped-multiline">
                <p className="control">
                    <a className="button is-large">
                    09:00
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    09:30
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    10:00
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    10:30
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    11:00
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    11:30
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    12:00
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    12:30
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    13:00
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    13:30
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    14:00
                    </a>
                </p>
                <p className="control">
                    <a className="button is-large">
                    14:30
                    </a>
                </p>
            </div>
            <PatientNav 
                previousPage="/patient/practicioner" // Go back to the select practitioner page
                nextPage="/patient/details" // Route to the patient details page
            />
            <div className="code-entry">
                <p>&#169; DocWait</p>
            </div>
        </div>
      </>
    )
  }

  export default PatientTime
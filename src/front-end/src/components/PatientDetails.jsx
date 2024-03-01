import React from 'react'
import { useNavigate } from 'react-router-dom'
import PatientNav from './PatientNav'

const PatientDetails = () => {
    let navigate = useNavigate()

    const handleJoinQueueClick = () => {
      navigate('/patient/confirmation')
    }

  return (
    <>
        <div className="box custom-padding">
            <h1 className="subtitle is-2 has-text-centered">Clinic Name</h1>
            <hr />

            <h3 className="title is-3 has-text-centered">Enter your details</h3>

            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input"></input>
                </div>
            </div>
            <div className="field">
                <label className="label">Date of Birth</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input"></input>
                </div>
            </div>
            <div className="field">
                <label className="label">Phone Number</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input"></input>
                </div>
            </div>
            <div className="centered-container queue-join">
                <div className="field is-grouped ">
                    <div className="control">
                        <button className="button is-large is-link" onClick={handleJoinQueueClick}>Join Queue</button>
                    </div>
                </div>
            </div>
            <div className="field has-text-centered">
                <div className="control">
                    <label className="terms">
                        <a href="#">Terms and conditions</a>
                    </label>
                </div>
            </div>
            <div className="code-entry">
            <p>&#169; QueueMate</p>
            </div>
            <PatientNav 
                previousPage="/patient/time" // Go back to the select time page
                nextDisabled={true} // Disables the "Next page" link
            />
        </div>  
    </>
  )
}

export default PatientDetails

import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../patientstyles.css'

const PatientHome = () => {

    let navigate = useNavigate()

    const handleJoinQueueClick = () => {
      navigate('/patient/queue') // Navigate to the Practitioner Type page
    }

  return (
    <>
        <div className='box custom-padding'>
            <h1 className="subtitle is-2 has-text-centered">Clinic Name</h1>
            <hr />
            <h5 className="subtitle is-5 has-text-centered">Address: 123 Example Street</h5>
            <hr />
            <h5 className="subtitle is-5 has-text-centered">Contact Number: 0412345678</h5>
            <hr />
            <h5 className="subtitle is-5 has-text-centered">People in queue:</h5>
            <h5 className="subtitle is-5 has-text-centered">2</h5>
            <h5 className="subtitle is-5 has-text-centered">ETA: 20 Minutes</h5>
            <div className="centered-container">
                <div className="field is-grouped ">
                    <div className="control">
                        <button className="button  is-large is-link" onClick={handleJoinQueueClick}>Join the Queue</button>
                    </div>
                </div>
            </div>
            <div className="code-entry">
            <a className="link has-text-centered">Already queued? Enter your code</a>
            </div>
            <div className="code-entry">
            <p>&#169; DocWait</p>
            </div>
        </div>
    </>
  )
}

export default PatientHome
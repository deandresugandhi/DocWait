import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PatientConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const practitioner = queryParams.get('practitioner');

  const leaveQueue = () => {
    navigate('/patient'); // Navigate back to the patient home page
  };
  
  return (
    <>
        <div className='box custom-padding'>
            <h1 className="subtitle is-2 has-text-centered">Clinic Name</h1>
            <hr />
            <h3 className="title is-3 has-text-centered">You're in!</h3>
            <h4 className="subtitle is-4 has-text-centered">Place in line:</h4>
            <h4 className="subtitle is-4 has-text-centered">3</h4>
            <h4 className="subtitle is-4 has-text-centered">ETA: 30 Minutes</h4>
            <hr />
            <div className="name-of-patient has-text-centered">
                <p>Patients Name:</p>
                <p>{name}</p>
            </div>
            <hr />
            <div className="practice-details block has-text-centered">
            <a
              className="link"
              href="https://maps.app.goo.gl/KDUpT5cdLFgcJwR39"
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions to clinic
            </a>
              <a className="link has-text-centered" href="tel:0415506383">Contact Clinic</a>    
              <a className="link has-text-centered" onClick={leaveQueue} style={{cursor: 'pointer'}}>Leave queue</a>
            </div>
            <div className="code-entry">
              <p>&#169; DocWait</p>
            </div>
        </div>
    </>
  )
}

export default PatientConfirmation

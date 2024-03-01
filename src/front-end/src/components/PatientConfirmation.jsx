import React from 'react'

const PatientConfirmation = () => {
  return (
    <>
        <div className='box custom-padding'>
            <h1 className="subtitle is-2 has-text-centered">Clinic Name</h1>
            <hr />
            <h3 className="title is-3 has-text-centered">You're in!</h3>
            <h5 className="subtitle is-5 has-text-centered">Place in line:</h5>
            <h5 className="subtitle is-5 has-text-centered">3</h5>
            <h5 className="subtitle is-5 has-text-centered">ETA: 30 Minutes</h5>
            <hr />
            <div className="name-of-patient has-text-centered">
                <p>Name</p>
                <p>Patients name</p>
            </div>
            <div className="practicioner detail has-text-centered">
                <p>Practicioner</p>
                <p>Practicioners name</p>
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
              <a className="link has-text-centered">Leave queue</a>
            </div>
            <div className="code-entry">
              <p>&#169; DocWait</p>
            </div>
        </div>
    </>
  )
}

export default PatientConfirmation

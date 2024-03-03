import React, { useState } from 'react'
import '../patientstyles.css'
import PatientNav from './PatientNav'

const PatientTime = () => {
    const [selectedTime, setSelectedTime] = useState('');

    const selectTime = (time) => {
        setSelectedTime(time)
    }

    const times = [
        "09:00", "09:30", "10:00", "10:30", 
        "11:00", "11:30", "12:00", "12:30", 
        "13:00", "13:30", "14:00", "14:30"
    ]

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
                {times.map((time) => (
                    <p className="control" key={time}>
                        <button className={`button is-large ${selectedTime === time ? 'is-selected' : ''}`} onClick={() => selectTime(time)}>
                            {time}
                        </button>
                    </p>
                ))}
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
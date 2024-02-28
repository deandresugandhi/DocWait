import React from 'react'
import QueueEntry from './QueueEntry'

const Customers = ({ patients=[] }) => {
  return (
    <>
      <div className='is-fullwidth is-flex is-flex-direction-column ml-3'>
        <h1 className='is-size-4'>Clinic Name's</h1>
        <h1 className='is-size-1 has-text-weight-bold mb-3'>Customers</h1>
        <div className="box is-fullwidth is-fullheight has-background-light large-rounded-box is-flex is-flex-direction-column">
          <div className='is-flex is-flex-direction-row bottom-border'>
            <h2 className='is-third-width pl-3'>NAME</h2>
            <h2 className='is-third-width has-text-centered'>STATE</h2>
            <h2 className='is-third-width has-text-right'>DATE QUEUED</h2>
          </div>
          <ul>
            {patients.map((patient, index) => (
              <li key={index}>
                <QueueEntry patient={patient} />
              </li>          
            ))}
            <li key="add">
            <div className="box has-background-dark entry-rounded-box is-flex is-justify-content-center p-3 mt-2">
              <p className="has-text-centered has-text-white has-text-weight-semibold">Add More +</p>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Customers

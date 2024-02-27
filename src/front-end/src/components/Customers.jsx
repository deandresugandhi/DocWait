import React from 'react'
import QueueEntry from './QueueEntry'
import AdminNavBar from './AdminNavBar'

const Customers = ({ patients=[] }) => {
  return (
    <>
      <div className='full-height is-marginless is-flex is-flex-direction-row'>
        <AdminNavBar />
        <div className='is-marginless fill-width is-flex is-flex-direction-column ml-3'>
          <h1 className='is-size-4'>Clinic Name's</h1>
          <h1 className='black is-size-1 mb-3'>Customers</h1>
          <div className="box fill-width fill-height custom-color large-rounded-box is-flex is-flex-direction-column">
            <div className='is-flex is-flex-direction-row bottom-border'>
              <h2 className='third-width pl-3'>NAME</h2>
              <h2 className='third-width has-text-centered'>STATE</h2>
              <h2 className='third-width has-text-right'>DATE QUEUED</h2>
            </div>
            <ul>
              {patients.map((patient, index) => (
                <li key={index}>
                  <QueueEntry patient={patient} />
                </li>          
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Customers

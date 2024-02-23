import React from 'react'
import QueueEntry from './QueueEntry'
import AdminNavBar from './AdminNavBar'

const customers = ({ queueEntries=[] }) => {
  return (
    <>
      <div className='full-width full-height no-margin is-flex is-flex-direction-row'>
        <AdminNavBar />
        <div className='full-height fill-width no-margin is-flex is-flex-direction-column'>
          <h1 className='navbar-text-margin is-1'>Clinic Name's</h1>
          <h1 className='navbar-text-margin black is-size-3'>Customers</h1>
          <div className='full-height fill-width no-margin is-flex is-flex-direction-row'>
            <div className="box fill-width custom-color navbar-rounded-box is-flex is-flex-direction-column">
              <ul>
                {queueEntries.map((entry, index) => (
                  <li key={index}>
                    <QueueEntry patient={entry} />
                  </li>          
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default customers

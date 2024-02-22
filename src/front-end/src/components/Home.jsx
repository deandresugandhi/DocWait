import React from 'react'
import QueueEntry from './QueueEntry'
import AdminNavBar from './AdminNavBar'

const Home = ({ queueEntries=[] }) => {
  return (
    <>
      <div className='full-width full-height no-margin is-flex is-flex-direction-row'>
        <AdminNavBar />
        <div className='full-height full-width no-margin is-flex is-flex-direction-column'>
          <h1 className='navbar-text-margin is-1'>Welcome Back,</h1>
          <h1 className='navbar-text-margin black is-size-3'>Clinic Name</h1>
          <div className='full-height no-margin is-flex is-flex-direction-row'>
            <div className="box third-width custom-color navbar-rounded-box is-flex is-flex-direction-column">
              <h1 className="is-size-5 bold">In Queue</h1>
              <ul>
                {queueEntries.map((entry, index) => (
                  <li key={index}>
                    <QueueEntry entry={entry} />
                  </li>          
                ))}
              </ul>
            </div>
            <div className="box third-width custom-color navbar-rounded-box is-flex is-flex-direction-column">
              <h1 className="is-size-5 bold">Serving</h1>
              <ul>
                {queueEntries.map((entry, index) => (
                  <li key={index}>
                    <QueueEntry entry={entry} />
                  </li>          
                ))}
              </ul>
            </div>
            <div className="box third-width custom-color navbar-rounded-box is-flex is-flex-direction-column">
              <h1 className="is-size-5 bold">Completed</h1>
              <ul>
                {queueEntries.map((entry, index) => (
                  <li key={index}>
                    <QueueEntry entry={entry} />
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

export default Home
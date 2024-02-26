import React from 'react'
import QueueEntry from './QueueEntry'
import AdminNavBar from './AdminNavBar'

const Home = ({ queueEntries=[] }) => {
  return (
    <>
      <div className='full-height is-marginless is-flex is-flex-direction-row'>
        <AdminNavBar />
        <div className='full-height fill-width is-marginless is-flex is-flex-direction-column ml-3'>
          <h1 className='is-size-4'>Welcome Back,</h1>
          <h1 className='black is-size-1 mb-3'>Clinic Name</h1>
          <div className='full-height is-marginless is-flex is-flex-direction-row'>
            <div className="box third-width custom-color large-rounded-box is-flex is-flex-direction-column mr-3">
              <h1 className="is-size-5 bold bottom-border">In Queue</h1>
              <ul>
                {queueEntries.map((entry, index) => (
                  <li key={index}>
                    <QueueEntry entry={entry} />
                  </li>          
                ))}
              </ul>
            </div>
            <div className="box third-width custom-color large-rounded-box is-flex is-flex-direction-column mr-3">
              <h1 className="is-size-5 bold bottom-border">Serving</h1>
              <ul>
                {queueEntries.map((entry, index) => (
                  <li key={index}>
                    <QueueEntry entry={entry} />
                  </li>          
                ))}
              </ul>
            </div>
            <div className="box third-width custom-color large-rounded-box is-flex is-flex-direction-column">
              <h1 className="is-size-5 bold bottom-border">Completed</h1>
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
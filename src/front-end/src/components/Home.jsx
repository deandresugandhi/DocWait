import React from 'react'
import QueueEntry from './QueueEntry'
import AdminNavBar from './AdminNavBar'

const Home = ({ queueEntries=[] }) => {
  return (
    <>
      <div className='full-width full-height no-margin is-flex is-flex-direction-row'>
        <AdminNavBar />
        <div className='custom-width-2 full-height no-margin is-flex is-flex-direction-row'>
          <div className="box custom-width is-flex is-flex-direction-column">
            <h1 className="is-size-5 has-text-weight-bold">In Queue</h1>
            <ul>
              {queueEntries.map((entry, index) => (
                <li key={index}>
                  <QueueEntry entry={entry} />
                </li>          
              ))}
            </ul>
          </div>
          <div className="box custom-width is-flex is-flex-direction-column">
            <h1 className="is-size-5 has-text-weight-bold">Serving</h1>
            <ul>
              {queueEntries.map((entry, index) => (
                <li key={index}>
                  <QueueEntry entry={entry} />
                </li>          
              ))}
            </ul>
          </div>
          <div className="box custom-width is-flex is-flex-direction-column">
            <h1 className="is-size-5 has-text-weight-bold">Completed</h1>
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
    </>
  )
}

export default Home
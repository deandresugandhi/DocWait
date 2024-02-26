import React from 'react'
import AdminNavBar from './AdminNavBar'
import SettingsNavBar from './SettingsNavBar'
import QueueEntry from './QueueEntry'

const SettingsManagePractitioner = ({ practitioners=[] }) => {
  return (
    <>
      <div className='full-height is-marginless is-flex is-flex-direction-row'>
        <AdminNavBar />
        <div className='is-marginless fill-width is-flex is-flex-direction-row ml-3'>
          <div className='is-marginless is-flex is-flex-direction-column'>
            <h1 className='is-size-4'>Clinic Name's</h1>
            <h1 className='black is-size-1 mb-3'>Settings</h1>
            <SettingsNavBar />
          </div>
          <div className="box fill-height fill-width custom-color large-rounded-box is-flex is-flex-direction-column ml-3">
            <div className='is-flex is-flex-direction-row bottom-border'>
              <h2 className='third-width pl-3'>NAME</h2>
              <h2 className='third-width'>AVAILABILITY</h2>
            </div>
            <ul>
              {practitioners.map((practitioner, index) => (
                <li key={index}>
                  <QueueEntry practitioner={practitioner} />
                </li>          
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsManagePractitioner
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
            <h1 className='is-1'>Clinic Name's</h1>
            <h1 className='black is-size-3 mb-3'>Settings</h1>
            <SettingsNavBar />
          </div>
          <div className="box fill-height fill-width custom-color large-rounded-box is-flex is-flex-direction-column ml-3">
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
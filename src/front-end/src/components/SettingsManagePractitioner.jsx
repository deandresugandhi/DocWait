import React from 'react'
import SettingsNavBar from './SettingsNavBar'
import QueueEntry from './QueueEntry'

const SettingsManagePractitioner = ({ practitioners=[] }) => {
  return (
    <>
      <div className='is-fullwidth is-flex is-flex-direction-row ml-3'>
        <div className='is-flex is-flex-direction-column'>
          <h1 className='is-size-4'>Clinic Name's</h1>
          <h1 className='is-size-1 has-text-weight-bold mb-3 '>Settings</h1>
          <SettingsNavBar />
        </div>
        <div className="box is-fullheight is-fullwidth has-background-light large-rounded-box is-flex is-flex-direction-column ml-3">
          <div className='bottom-border is-flex is-flex-direction-row '>
            <h2 className='is-third-width pl-3'>NAME</h2>
            <h2 className='is-third-width'>AVAILABILITY</h2>
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
    </>
  )
}

export default SettingsManagePractitioner
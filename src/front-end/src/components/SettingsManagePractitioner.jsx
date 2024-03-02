import React from 'react'
import SettingsNavBar from './SettingsNavBar'
import QueueEntry from './QueueEntry'
import { openModal } from './ModalConfig'
import AddPractitioner from './AddPractitioner'

const SettingsManagePractitioner = ({ practitioners=[], setPractitioners }) => {
  return (
    <>
      <div className='settings is-fullwidth is-flex is-flex-direction-row ml-3'>
        <div className='settings-2 is-flex is-flex-direction-column'>
          <h1 className='is-size-4'>Clinic Name's</h1>
          <h1 className='is-size-1 has-text-weight-bold mb-3 '>Settings</h1>
          <SettingsNavBar />
        </div>
        <div className="box is-fullheight is-overflow is-fullwidth has-background-light large-rounded-box is-flex is-flex-direction-column ml-3">
          <div className='bottom-border is-flex is-flex-direction-row'>
            <h2 className='is-half-width pl-3'>NAME</h2>
            <h2 className='is-half-width margin-fix'>AVAILABILITY</h2>
          </div>
          <ul>
            {practitioners.map((practitioner, index) => (
              <li key={index}>
                <QueueEntry practitioner={practitioner} setPractitioners={setPractitioners} />
              </li>          
            ))}
            <li key="add">
              <div className="box is-clickable has-background-dark entry-rounded-box is-flex is-justify-content-center p-3 mt-2" onClick={() => openModal('add-practitioner')}>
                <p className="has-text-centered has-text-white has-text-weight-semibold">Add More +</p>
              </div>
            </li>
          </ul>
          <AddPractitioner setPractitioners={setPractitioners}/>
        </div>
      </div>
    </>
  )
}

export default SettingsManagePractitioner
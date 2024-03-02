import { React } from 'react'
import QueueEntry from './QueueEntry'
import AddPatient from './AddPatient'
import EditPatient from './EditPatient'
import { openModal } from './ModalConfig'

const Customers = ({ patients=[], setPatients }) => {
  return (
    <>
      <div className='is-fullwidth is-flex is-flex-direction-column ml-3'>
        <h1 className='is-size-4'>Clinic Name's</h1>
        <h1 className='is-size-1 has-text-weight-bold mb-3'>Customers</h1>
        <div className="box is-fullwidth is-fullheight is-overflow has-background-light large-rounded-box is-flex is-flex-direction-column">
          <div className='columns pt-3 is-flex is-flex-direction-row bottom-border'>
            <h2 className='column is-one-quarter pl-5'>NAME</h2>
            <h2 className='column is-one-quarter has-text-centered'>STATE</h2>
            <h2 className='column pr-3 has-text-right is-hidden-mobile'>DATE QUEUED</h2>
            <h2 className='column'></h2>
          </div>
          <ul>
            {patients.map((patient, index) => (
              <li key={index}>
                <QueueEntry patient={patient} setPatients={setPatients}/>
              </li>          
            ))}
            <li key="add">
              <div className="box is-clickable has-background-dark entry-rounded-box is-flex is-justify-content-center p-3 mt-2" onClick={() => openModal('add-patient')}>
                <p className="has-text-centered has-text-white has-text-weight-semibold">Add More +</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <AddPatient setPatients={setPatients}/>
      
    </>
  )
}

export default Customers

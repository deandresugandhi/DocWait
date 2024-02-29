import { useState, useEffect, React } from 'react'
import SettingsNavBar from './SettingsNavBar'
import { InformationField, OpeningHoursField } from './InformationField'



const SettingsUpdateInformation = ({ clinic=[] }) => {
  const [nameValue, setNameValue] = useState('')
  const [addressValue, setAddressValue] = useState('')
  const [URLValue, setURLValue] = useState('')
  const [openingHoursValue, setOpeningHoursValue]= useState('')
   
  function reset() {
    setNameValue('')
    setAddressValue('')
    setURLValue('')
    setOpeningHoursValue('')
  }

  function updateInfo(e) {
    const newInfo = [{
      name: nameValue,
      address: addressValue,
      url: URLValue,
      openingHours:openingHoursValue,
    }]
    fetch('https://t3a2.onrender.com/clinic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInfo)
    })
    reset()
  }

  return (
    <>
      <div className='is-fullwidth is-flex is-flex-direction-row ml-3'>
        <div className='is-flex is-flex-direction-column'>
          <h1 className='is-size-4'>Clinic Name's</h1>
          <h1 className='is-size-1 has-text-weight-bold mb-3'>Settings</h1>
          <SettingsNavBar />
        </div>
        <div className="box is-fullheight is-fullwidth has-background-light large-rounded-box is-flex is-flex-direction-column ml-3">
          <h1 className='is-size-3 pl-5 pt-5 has-text-weight-bold'>Update Information</h1>
            <form className="section pl-5" onSubmit={updateInfo}>
                <InformationField label="Clinic Name" state={nameValue} setState={setNameValue} clinic={clinic} fieldName="name"/>
                <InformationField label="Address" state={addressValue} setState={setAddressValue} clinic={clinic} fieldName="address"/>
                <InformationField label="URL" state={URLValue} setState={setURLValue} clinic={clinic} fieldName="url" />
                <OpeningHoursField label="Opening Hours" state={openingHoursValue} setState={setOpeningHoursValue} clinic={clinic}/>
                <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-link">Save</button>
                    </div>
                    <div className="control">
                      <button className="button is-link" onClick={reset}>Reset</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </>
  )
}

export default SettingsUpdateInformation
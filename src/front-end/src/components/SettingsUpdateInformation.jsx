import { useState, React } from 'react'
import AdminNavBar from './AdminNavBar'
import SettingsNavBar from './SettingsNavBar'
import { InformationField, OpeningHoursField } from './InformationField'



const SettingsUpdateInformation = ( setClinic ) => {
  const [nameValue, setNameValue]= useState('')
  const [addressValue, setAddressValue]= useState('')
  const [URLValue, setURLValue]= useState('')
  const [openingHoursValue, setOpeningHoursValue]= useState('')

  function reset() {
    setNameValue('')
    setAddressValue('')
    setURLValue('')
    setOpeningHoursValue('')
  }

  function updateInfo(e) {
    const newInfo = {
      name: nameValue,
      address: addressValue,
      url: URLValue,
      openingHours:openingHoursValue,
    }
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
      <div className='full-height is-marginless is-flex is-flex-direction-row'>
        <AdminNavBar />
        <div className='is-marginless fill-width is-flex is-flex-direction-row ml-3'>
          <div className='is-marginless is-flex is-flex-direction-column'>
            <h1 className='is-size-4'>Clinic Name's</h1>
            <h1 className='black is-size-1 mb-3'>Settings</h1>
            <SettingsNavBar />
          </div>
          <div className="box fill-height fill-width custom-color large-rounded-box is-flex is-flex-direction-column ml-3">
            <h1 className='black is-size-3 pl-5 pt-5'>Update Information</h1>
              <form className="section pl-5" onSubmit={updateInfo}>
                  <InformationField fieldName="Clinic Name" state={nameValue} setState={setNameValue} />
                  <InformationField fieldName="Address" state={addressValue} setState={setAddressValue} />
                  <InformationField fieldName="URL" state={URLValue} setState={setURLValue} />
                  <OpeningHoursField fieldName="Opening Hours" state={openingHoursValue} setState={setOpeningHoursValue} />
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
      </div>
    </>
  )
}

export default SettingsUpdateInformation
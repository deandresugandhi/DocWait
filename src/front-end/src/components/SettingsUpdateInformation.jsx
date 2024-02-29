import { useState, useEffect, React } from 'react'
import SettingsNavBar from './SettingsNavBar'
import { InformationField, OpeningHoursField } from './InformationField'



const SettingsUpdateInformation = ({ clinic=[], openingHours=[] }) => {
  const [nameValue, setNameValue] = useState('')
  const [addressValue, setAddressValue] = useState('')
  const [URLValue, setURLValue] = useState('')
  const [mondayValue, setMondayValue] = useState('')
  const [tuesdayValue, setTuesdayValue] = useState('')
  const [wednesdayValue, setWednesdayValue] = useState('')
  const [thursdayValue, setThursdayValue] = useState('')
  const [fridayValue, setFridayValue] = useState('')
  const [saturdayValue, setSaturdayValue] = useState('')
  const [sundayValue, setSundayValue] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

   
  function reset() {
    setNameValue('')
    setAddressValue('')
    setURLValue('')
    setMondayValue('')
    setTuesdayValue('')
    setWednesdayValue('')
    setThursdayValue('')
    setFridayValue('')
    setSaturdayValue('')
    setSundayValue('')
  }

  async function editOpeningHours() {
    let newOpeningHours = [
        mondayValue,
        tuesdayValue,
        wednesdayValue,
        thursdayValue,
        fridayValue,
        saturdayValue,
        sundayValue
    ]
    
    fetch(`https://t3a2.onrender.com/openingHours`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOpeningHours)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to register opening hours');
        }
        return response.json();
    })
    .then(data => {
        setErrorMessage(null);
        setSuccessMessage("Opening hours registered successfully.");
    })
    .catch(error => {
        console.error(error);
        setErrorMessage("Please check opening hour details and try again.");
    });
  };

  async function editAddress() {
    let newAddress = {
        unitNumber: unitNumber.trim() !== '' ? unitNumber : undefined,
        streetNumber: streetNumber.trim() !== '' ? streetNumber : undefined,
        streetName: streetName.trim() !== '' ? streetName : undefined,
        suburb: suburb.trim() !== '' ? suburb : undefined,
        state: state.trim() !== '' ? state : undefined,
        postcode: postcode.trim() !== '' ? postcode : undefined,
        country: country.trim() !== '' ? country : undefined,
    };

    // Remove undefined properties from newInfo
    newAddress = Object.fromEntries(Object.entries(newAddress).filter(([_, v]) => v !== undefined));

    fetch(`https://t3a2.onrender.com/addresses/${clinic.address._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAddress)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to register new address');
        }
        return response.json();
    })
    .then(data => {
        setErrorMessage(null);
        setSuccessMessage("Address registered successfully.");
    })
    .catch(error => {
        console.error(error);
        setErrorMessage("Please check address details and try again.");
        reject(error);
    });
  };

  async function updateInfo(e) {
    e.preventDefault();
    try {
      await editAddress()
      await editOpeningHours();
      
      let newInfo = {
        name: nameValue.trim() !== '' ? firstNameValue : undefined,
        URL: URLValue.trim()  !== '' ? URLValue : undefined
      };

      newInfo = Object.fromEntries(Object.entries(newInfo).filter(([_, v]) => v !== undefined));

    } catch (error) {
      console.error(error);
      setErrorMessage("Please check details and try again.");
    }
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
                <OpeningHoursField label="Opening Hours" state={openingHoursValue} setState={setOpeningHoursValue} openingHours={openingHours}/>
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
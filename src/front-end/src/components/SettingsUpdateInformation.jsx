import { useState, useEffect, React } from 'react'
import SettingsNavBar from './SettingsNavBar'
import { InformationField, OpeningHoursField } from './InformationField'



const SettingsUpdateInformation = ({ clinic=[], openingHours=[] }) => {
  const [nameValue, setNameValue] = useState('')
  const [URLValue, setURLValue] = useState('')

  const [unitNumber, setUnitNumber] = useState('')
  const [streetNumber, setStreetNumber] = useState('')
  const [streetName, setStreetName] = useState('')
  const [suburb, setSuburb] = useState('')
  const [state, setState] = useState('')
  const [postcode, setPostCode] = useState('')
  const [country, setCountry] = useState('')

  const [isOpenMonday, setIsOpenMonday] = useState('')
  const [openingTimeMonday, setOpeningTimeMonday] = useState('')
  const [closingTimeMonday, setClosingTimeMonday] = useState('')
  
  const [isOpenTuesday, setIsOpenTuesday] = useState('')
  const [openingTimeTuesday, setOpeningTimeTuesday] = useState('')
  const [closingTimeTuesday, setClosingTimeTuesday] = useState('')

  const [isOpenWednesday, setIsOpenWednesday] = useState('')
  const [openingTimeWednesday, setOpeningTimeWednesday] = useState('')
  const [closingTimeWednesday, setClosingTimeWednesday] = useState('')

  const [isOpenThursday, setIsOpenThursday] = useState('')
  const [openingTimeThursday, setOpeningTimeThursday] = useState('')
  const [closingTimeThursday, setClosingTimeThursday] = useState('')

  const [isOpenFriday, setIsOpenFriday] = useState('')
  const [openingTimeFriday, setOpeningTimeFriday] = useState('')
  const [closingTimeFriday, setClosingTimeFriday] = useState('')

  const [isOpenSaturday, setIsOpenSaturday] = useState('')
  const [openingTimeSaturday, setOpeningTimeSaturday] = useState('')
  const [closingTimeSaturday, setClosingTimeSaturday] = useState('')

  const [isOpenSunday, setIsOpenSunday] = useState('')
  const [openingTimeSunday, setOpeningTimeSunday] = useState('')
  const [closingTimeSunday, setClosingTimeSunday] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const setStates = [
    [setIsOpenMonday, setOpeningTimeMonday, setClosingTimeMonday],
    [setIsOpenTuesday, setOpeningTimeTuesday, setClosingTimeTuesday],
    [setIsOpenWednesday, setOpeningTimeWednesday, setClosingTimeWednesday],
    [setIsOpenThursday, setOpeningTimeThursday, setClosingTimeThursday],
    [setIsOpenFriday, setOpeningTimeFriday, setClosingTimeFriday],
    [setIsOpenSaturday, setOpeningTimeSaturday, setClosingTimeSaturday],
    [setIsOpenSunday, setOpeningTimeSunday, setClosingTimeSunday],
  ]

  function reset() {}

  async function editOpeningHours() {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
    const fetchPromises = daysOfWeek.map(day => {
      const entry = {
        day: day,
        isOpen: eval(`isOpen${day}`) !== '' ? eval(`isOpen${day}`) : undefined,
        openingTime: eval(`openingTime${day}`) !== '' ? eval(`openingTime${day}`) : undefined,
        closingTime: eval(`closingTime${day}`) !== '' ? eval(`closingTime${day}`) : undefined
      };
  
      // Filter out undefined values
      const filteredEntry = Object.fromEntries(Object.entries(entry).filter(([_, v]) => v !== undefined));
  
      return fetch(`https://t3a2.onrender.com/opening_hours/search/${day}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filteredEntry)
      })
      .then(response => {
        if (!response.ok) {
          
          throw new Error(`Failed to register opening hours for ${day}`);
        }
        return response.json();
      });
    });
  
    try {
      await Promise.all(fetchPromises);
      setErrorMessage(null);
      setSuccessMessage("Opening hours registered successfully.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Please check opening hour details and try again.");
    }
  }

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

    // Remove undefined properties from newAddress
    newAddress = Object.fromEntries(Object.entries(newAddress).filter(([_, v]) => v !== undefined));

    fetch(`https://t3a2.onrender.com/addresses/${clinic[0].address._id}`, {
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
        name: nameValue.trim() !== '' ? nameValue : undefined,
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
      <div className='settings is-fullwidth is-flex is-flex-direction-row ml-3'>
        <div className='settings-2 is-flex is-flex-direction-column'>
          <h1 className='is-size-4'>Clinic Name's</h1>
          <h1 className='is-size-1 has-text-weight-bold mb-3'>Settings</h1>
          <SettingsNavBar />
        </div>
        <div className="box is-fullwidth has-background-light large-rounded-box is-flex is-flex-direction-column ml-3 is-overflow">
          <h1 className='is-size-3 pl-5 pt-5 has-text-weight-bold'>Update Information</h1>
            <form className="section pl-5" onSubmit={updateInfo}>
                <InformationField label="Clinic Name" state={nameValue} setState={setNameValue} clinic={clinic} fieldName="name"/>
                <label className="label">Address</label>
                <div className="box is-fullwidth has-background-info large-rounded-box is-flex is-flex-direction-column">
                  <InformationField label="Unit Number" setState={setUnitNumber} clinic={clinic} fieldName="unitNumber" nested={true}/>
                  <InformationField label="Street Number" setState={setStreetNumber} clinic={clinic} fieldName="streetNumber" nested={true}/>
                  <InformationField label="Street Name" setState={setStreetName} clinic={clinic} fieldName="streetName" nested={true}/>
                  <InformationField label="Suburb" setState={setSuburb} clinic={clinic} fieldName="suburb" nested={true}/>
                  <InformationField label="State" setState={setState} clinic={clinic} fieldName="state" nested={true}/>
                  <InformationField label="Postcode" setState={setPostCode} clinic={clinic} fieldName="postcode" nested={true}/>
                  <InformationField label="Country" setState={setCountry} clinic={clinic} fieldName="country" nested={true}/>
                </div>
                <InformationField label="URL" state={URLValue} setState={setURLValue} clinic={clinic} fieldName="url" />
                {OpeningHoursField({label:"Opening Hours", setStates:setStates, openingHours:openingHours})}
                <div className="field is-grouped is-justify-content-flex-end">
                    <div className="control">
                      <button className="button is-link">Save</button>
                    </div>
                    <div className="control">
                      <button className="button is-link" onClick={reset}>Reset</button>
                    </div>
                </div>
                {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                {successMessage && <p className="has-text-success">{successMessage}</p>}
            </form>
        </div>
      </div>
    </>
  )
}

export default SettingsUpdateInformation

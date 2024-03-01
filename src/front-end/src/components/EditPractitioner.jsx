import { React, useState, useEffect } from 'react'
import { openModal, closeModal } from './ModalConfig'
import DeletePractitioner from './DeletePractitioner'

const Field = ({ labelName, setState, practitioner, fieldName }) => {
    const [placeholderValue, setPlaceholderValue] = useState('');

    useEffect(() => {
        if (practitioner) {
          setPlaceholderValue(practitioner[fieldName])
        } else {
          setPlaceholderValue("Loading...");
        }
      }, [practitioner]
    );

    return (
        <div className="field">
            <label className={"label"}>{labelName}</label>
            <div className="control">
                <textarea
                    className="input"
                    type="text"
                    defaultValue={placeholderValue}
                    onInput={e => setState(e.target.value)}
                    placeholder = {placeholderValue}
                />
            </div>
        </div>
    )
}

const EditPractitioner = ({ practitioner, modalId, setPractitioners }) => {
    
  const [firstNameValue, setFirstNameValue] = useState('')
  const [lastNameValue, setLastNameValue] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [availability, setAvailability] = useState('On duty')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
    

  function updateInfo(e) {
    e.preventDefault();
    try {
      // Construct the newInfo object conditionally
      newInfo = {
        firstName: firstNameValue.trim() !== '' ? firstNameValue : undefined,
        lastName: lastNameValue.trim() !== '' ? lastNameValue : undefined,
        phoneNumber: phoneNumber.trim() !== '' ? phoneNumber : undefined
      };

      // Remove undefined properties from newInfo
      newInfo = Object.fromEntries(Object.entries(newInfo).filter(([_, v]) => v !== undefined));

      fetch(`https://t3a2.onrender.com/practitioners/${practitioner._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInfo)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update practitioner details');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setErrorMessage(null);
        setSuccessMessage("Practitioner details updated successfully.");
        setPractitioners(prevArray => prevArray.map(item => (item._id === data._id ? data : item)));
      })
      .catch(error => {
        console.error(error);
        setErrorMessage("Please check practitioner details and try again.");
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Please check practitioner details and try again.");
    }
  }
  
  return (
    <>
      <div className="modal" id={modalId}>
        <div className="modal-background"></div>
        <div className="modal-card">
        <header className="modal-card-head">
            <p className="modal-card-title">Edit Practitioner</p>
            <button className="delete" aria-label="close" onClick={() => closeModal(modalId)}></button>
        </header>
        <form onSubmit={updateInfo}>
        <section className="modal-card-body">
            <Field labelName="First Name" setState={setFirstNameValue} practitioner={practitioner} fieldName="firstName" />
            <Field labelName="Last Name" setState={setLastNameValue} practitioner={practitioner} fieldName="lastName" />
            <Field labelName="Phone Number" setState={setPhoneNumber} practitioner={practitioner} fieldName="phoneNumber" />
            {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
            {successMessage && <p className="has-text-success">{successMessage}</p>}
        </section>
        <footer className="modal-card-foot">
            <button className="button is-success" type="submit">Save changes</button>
            <button className="button is-danger" type="button" onClick={() => openModal(`delete-practitioner-${practitioner?._id}`)}>Delete practitioner</button>
            <button className="button" type="button" onClick={() => closeModal(modalId)}>Cancel</button>
        </footer>
        </form>
        </div>
      </div>
      <DeletePractitioner practitioner={practitioner} modalID={`delete-practitioner-${practitioner?._id}`} setPractitioners={setPractitioners}/>
    </>
  )
}

export default EditPractitioner
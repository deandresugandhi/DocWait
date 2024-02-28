import { React, useState } from 'react'
import { closeModal } from './ModalConfig'

const Field = ({ labelName, state, setState }) => {
    return (
        <div className="field">
            <label className="label">{labelName}</label>
            <div className="control">
                <textarea
                    key="random2"
                    className="input"
                    type="text"
                    value={state}
                    onInput={e => setState(e.target.value)}
                />
            </div>
        </div>
    )
}

const AddPatient = () => {
    
    const [firstNameValue, setFirstNameValue] = useState('')
    const [lastNameValue, setLastNameValue] = useState('')
    const [unitNumber, setUnitNumber] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [streetName, setStreetName] = useState('')
    const [suburb, setSuburb] = useState('')
    const [state, setState] = useState('')
    const [postcode, setPostCode] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    

    function reset() {
        setFirstNameValue('')
        setLastNameValue('')
        setUnitNumber('')
        setStreetNumber('')
        setStreetName('')
        setSuburb('')
        setState('')
        setPostCode('')
        setCountry('')
        setPhoneNumber('')
    }
    
    function updateInfo(e) {
        e.preventDefault()
        let newInfo
        try {
            newInfo = {
                firstName: firstNameValue,
                lastName: lastNameValue,
                address: {
                    unitNumber: unitNumber,
                    streetNumber: streetNumber,
                    streetName: streetName,
                    suburb: suburb,
                    state: state,
                    postcode: postcode,
                    country: country,
                },
                phoneNumber: phoneNumber
            }
            fetch('https://t3a2.onrender.com/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newInfo)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to register new patient');
                }
                return response.json();
            })
            .then(data => {
                reset();
                setErrorMessage(null);
                setSuccessMessage("Patient registered successfully.");
            })
            .catch(error => {
                console.error(error);
                setErrorMessage("Please check patient details and try again.");
            })
        } catch (error) {
            console.error(error);
            setErrorMessage("Please check patient details and try again.");
        }
    }
    
    return (
        <div className="modal" id="add-entry">
            <div className="modal-background"></div>
            <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Add Entry</p>
                <button className="delete" aria-label="close" onClick={() => closeModal("add-entry")}></button>
            </header>
            <form onSubmit={updateInfo}>
            <section className="modal-card-body">
                <Field labelName="First Name" state={firstNameValue} setState={setFirstNameValue} />
                <Field labelName="Last Name" state={lastNameValue} setState={setLastNameValue} />
                <Field labelName="Unit Number" state={unitNumber} setState={setUnitNumber} />
                <Field labelName="Street Number" state={firstNameValue} setState={setFirstNameValue} />
                <Field labelName="Street Name" state={firstNameValue} setState={setFirstNameValue} />
                <Field labelName="Suburb" state={firstNameValue} setState={setFirstNameValue} />
                <Field labelName="State" state={firstNameValue} setState={setFirstNameValue} />
                <Field labelName="Postcode" state={firstNameValue} setState={setFirstNameValue} />
                <Field labelName="Country" state={firstNameValue} setState={setFirstNameValue} />
                <Field labelName="Phone Number" state={firstNameValue} setState={setFirstNameValue} />
                {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                {successMessage && <p className="has-text-success">{successMessage}</p>}
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success">Save changes</button>
                <button className="button">Cancel</button>
            </footer>
            </form>
            </div>
        </div>
    )
}

export default AddPatient
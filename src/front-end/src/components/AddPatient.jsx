import { React, useState } from 'react'
import { closeModal } from './ModalConfig'

const Field = ({ labelName, state, setState, nested=false }) => {
    return (
        <div className="field">
            <label className={`label ${nested === true ? "is-size-7" : '' }`}>{labelName}</label>
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
    
    function addAddress() {
        let newAddress = {
            unitNumber: unitNumber,
            streetNumber: streetNumber,
            streetName: streetName,
            suburb: suburb,
            state: state,
            postcode: postcode,
            country: country,
        };
    
        return new Promise((resolve, reject) => {
            fetch('https://t3a2.onrender.com/addresses/create', {
                method: 'POST',
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
                reset();
                setErrorMessage(null);
                setSuccessMessage("Address registered successfully.");
                resolve(data[0]);
            })
            .catch(error => {
                console.error(error);
                setErrorMessage("Please check address details and try again.");
                reject(error);
            });
        });
    }


    function updateInfo(e) {
        e.preventDefault();
        addAddress()
            .then(newAddress => {
                let newInfo;
                try {
                    newInfo = {
                        firstName: firstNameValue,
                        lastName: lastNameValue,
                        address: newAddress,
                        phoneNumber: phoneNumber
                    };
    
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
                    });
                } catch (error) {
                    console.error(error);
                    setErrorMessage("Please check patient details and try again.");
                }
            })
            .catch(error => {
                console.error('Error registering address:', error);
            });
    }
    
    return (
        <div className="modal" id="add-patient">
            <div className="modal-background"></div>
            <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Add Patient</p>
                <button className="delete" aria-label="close" onClick={() => closeModal("add-patient")}></button>
            </header>
            <form onSubmit={updateInfo}>
            <section className="modal-card-body">
                <Field labelName="First Name" state={firstNameValue} setState={setFirstNameValue} />
                <Field labelName="Last Name" state={lastNameValue} setState={setLastNameValue} />
                <label className="label">Address</label>
                <div className="box is-fullheight is-fullwidth has-background-light large-rounded-box is-flex is-flex-direction-column">
                    <Field labelName="Unit Number" state={unitNumber} setState={setUnitNumber} nested={true} />
                    <Field labelName="Street Number" state={streetNumber} setState={setStreetNumber} nested={true} />
                    <Field labelName="Street Name" state={streetName} setState={setStreetName} nested={true} />
                    <Field labelName="Suburb" state={suburb} setState={setSuburb} nested={true} />
                    <Field labelName="State" state={state} setState={setState} nested={true} />
                    <Field labelName="Postcode" state={postcode} setState={setPostCode} nested={true}/>
                    <Field labelName="Country" state={country} setState={setCountry}nested={true} />
                </div>
                <Field labelName="Phone Number" state={phoneNumber} setState={setPhoneNumber} />
                {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                {successMessage && <p className="has-text-success">{successMessage}</p>}
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success">Save changes</button>
                <button className="button" onClick={() => closeModal("add-patient")}>Cancel</button>
            </footer>
            </form>
            </div>
        </div>
    )
}

export default AddPatient
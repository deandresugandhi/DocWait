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


const AddPractitioner = ({ setPractitioners }) => {
    
    const [firstNameValue, setFirstNameValue] = useState('')
    const [lastNameValue, setLastNameValue] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [availability, setAvailability] = useState('On duty')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    

    function reset() {
        setFirstNameValue('')
        setLastNameValue('')
        setAvailability('On duty')
        setPhoneNumber('')
    }
    

    function updateInfo(e) {
        e.preventDefault()
        let newInfo
        try {
            newInfo = {
                firstName: firstNameValue,
                lastName: lastNameValue,
                phoneNumber: phoneNumber,
                availability: availability
            }
            console.log(newInfo)
            fetch(`https://t3a2.onrender.com/practitioners/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newInfo)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to register practitioner');
                }
                return response.json();
            })
            .then(data => {
                setErrorMessage(null);
                setSuccessMessage("Practitioner registered successfully.");
                setPractitioners(prevArray => [...prevArray, data]);
                reset()
            })
            .catch(error => {
                console.error(error);
                setErrorMessage("Please check practitioner details and try again.");
            })
        } catch (error) {
            console.error(error);
            setErrorMessage("Please check practitioner details and try again.");
        }
    }
    
    return (
        <div className="modal" id="add-practitioner">
            <div className="modal-background"></div>
            <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Add Practitioner</p>
                <button className="delete" aria-label="close" onClick={() => closeModal("add-practitioner")}></button>
            </header>
            <form onSubmit={updateInfo}>
            <section className="modal-card-body">
                <Field labelName="First Name" state={firstNameValue} setState={setFirstNameValue} />
                <Field labelName="Last Name" state={lastNameValue} setState={setLastNameValue} />
                <Field labelName="Phone Number" state={phoneNumber} setState={setPhoneNumber} />
                <div className="field is-grouped is-align-items-center">
                    <div className="control is-tenth-width mr-6">
                        <label className="label">Availability</label>
                    </div>
                    <div className="control">
                        <div className="select is-rounded is-normal">
                            <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                                <option key="On duty" value="On duty">On duty</option>
                                <option key="Unavailable" value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                    </div>
                </div>
                {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                {successMessage && <p className="has-text-success">{successMessage}</p>}
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" type="Submit">Save changes</button>
                <button className="button" onClick={() => closeModal("add-practitioner")}>Cancel</button>
            </footer>
            </form>
            </div>
        </div>
    )
}

export default AddPractitioner
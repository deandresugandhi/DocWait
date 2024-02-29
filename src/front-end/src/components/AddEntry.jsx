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
const DropDown = ({ labelName, items, state, setState }) => {
    return (
        <div className="field is-grouped is-align-items-center">
            <div className="control is-tenth-width mr-6">
                <label className="label">{labelName}</label>
            </div>
            <div className="control">
                <div className="select is-rounded is-normal">
                    <select value={state} onChange={(e) => setState(e.target.value)}>
                        <option key="default" value="">Select {labelName}</option>
                        {items.map((item, index) => (
                            <option key={index} value={JSON.stringify(item)}>
                                {item.firstName} {item.lastName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

const AddEntry = ( {patients=[], practitioners=[]} ) => {
    
    const [patientValue, setPatientValue] = useState(patients.length > 0 ? JSON.stringify(patients[0]): '')
    const [practitionerValue, setPractitionerValue] = useState(practitioners.length > 0 ? JSON.stringify(practitioners[0]) : '')
    const [time, setTime] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    

    function reset() {
        setPatientValue('')
        setPractitionerValue('')
        setTime('')
    }
    
    function updateInfo(e) {
        e.preventDefault()
        let newInfo
        try {
            newInfo = {
                patient: JSON.parse(patientValue),
                practitioner: JSON.parse(practitionerValue),
                time: time,
                queueState: "Completed"
            }
            fetch('https://t3a2.onrender.com/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newInfo)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create entry');
                }
                return response.json();
            })
            .then(data => {
                reset();
                setErrorMessage(null);
                setSuccessMessage("Entry created successfully.");
            })
            .catch(error => {
                console.error(error);
                setErrorMessage("Please check entry details and try again.");
            })
        } catch (error) {
            console.error(error);
            setErrorMessage("Please check entry details and try again.");
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
                    {patients.length > 0 && (
                        <DropDown
                        labelName="Patient"
                        items={patients}
                        state={patientValue}
                        setState={setPatientValue}
                        />
                    )}
                    {practitioners.length > 0 && (
                        <DropDown
                        labelName="Practitioner"
                        items={practitioners}
                        state={practitionerValue}
                        setState={setPractitionerValue}
                        />
                    )}
                    <Field labelName="Appointment Time" state={time} setState={setTime} />
                    {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                    {successMessage && <p className="has-text-success">{successMessage}</p>}
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success">Save changes</button>
                <button className="button" onClick={() => closeModal("add-entry")}>Cancel</button>
            </footer>
            </form>
            </div>
        </div>
    )
}

export default AddEntry
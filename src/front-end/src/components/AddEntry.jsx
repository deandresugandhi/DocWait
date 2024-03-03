import { React, useState } from 'react'
import { closeModal } from './ModalConfig'

const Field = ({ labelName, state, setState, placeholder="" }) => {
    return (
        <div className="field">
            <label className="label">{labelName}</label>
            <div className="control">
                <textarea
                    key="random2"
                    className="input input-date-time"
                    type="text"
                    value={state}
                    onInput={e => setState(e.target.value)}
                    placeholder={placeholder}
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
                    <select className="select-add-entry" value={state} onChange={(e) => setState(e.target.value)}>
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

const AddEntry = ( {patients=[], practitioners=[], queueState, columnName, setQueueEntries} ) => {
    
    const [patientValue, setPatientValue] = useState(patients.length > 0 ? JSON.stringify(patients[0]): '')
    const [practitionerValue, setPractitionerValue] = useState(practitioners.length > 0 ? JSON.stringify(practitioners[0]) : '')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    

    function reset() {
        setPatientValue('')
        setPractitionerValue('')
        setTime('')
        setDate('')
    }
    
    function updateInfo(e) {
        e.preventDefault()
        let newInfo
        try {
            let dateParts = date.split("/")
            let timeParts = time.split(":")
            let day = parseInt(dateParts[0], 10)
            let month = parseInt(dateParts[1], 10) - 1
            let year = parseInt(dateParts[2], 10)
            let hours = parseInt(timeParts[0], 10)
            let minutes = parseInt(timeParts[1], 10)
            let dateObject = new Date(year, month, day, hours, minutes, 0)

            newInfo = {
                patient: JSON.parse(patientValue),
                practitioner: JSON.parse(practitionerValue),
                time: dateObject.toISOString(),
                queueState: queueState
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
                setQueueEntries(prevArray => [...prevArray, newInfo])
                console.log(newInfo)
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
        <div className="modal" id={`add-entry-${queueState.replace(/\s/g, '-')}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Add Entry to {columnName}</p>
                <button className="delete" aria-label="close" onClick={() => closeModal(`add-entry-${queueState.replace(/\s/g, '-')}`)}></button>
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
                    <Field labelName="Appointment Date" state={date} setState={setDate} placeholder="DD/MM/YYYY" />
                    <Field labelName="Appointment Time" state={time} setState={setTime} placeholder="HH:MM (24 Hour Format)" />
                    {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                    {successMessage && <p className="has-text-success">{successMessage}</p>}
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success">Save changes</button>
                <button className="button" onClick={() => closeModal(`add-entry-${queueState.replace(/\s/g, '-')}`)}>Cancel</button>
            </footer>
            </form>
            </div>
        </div>
    )
}

export default AddEntry
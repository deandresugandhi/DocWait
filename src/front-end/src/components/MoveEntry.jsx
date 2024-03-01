import { React, useState, useEffect } from 'react'
import { closeModal } from './ModalConfig'

const DropDown = ({ labelName, state, setState, entry }) => {
    const [placeholderValue, setPlaceholderValue] = useState('');

    useEffect(() => {
        if (entry) {
          setPlaceholderValue(entry.queueState)
        } else {
          setPlaceholderValue("Loading...");
        }
      }, [entry]);

    return (
        <div className="field is-grouped is-align-items-center">
            <div className="control is-tenth-width mr-6">
                <label className="label">{labelName}</label>
            </div>
            <div className="control">
                <div className="select is-rounded is-normal">
                    <select value={placeholderValue} onChange={(e) => {
                        setPlaceholderValue(e.target.value)
                        setState(e.target.value)}
                    }>
                        <option value="Pending">In Queue</option>
                        <option value="In progress">Serving</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

const MoveEntry = ( {entry, modalID, setQueueEntries} ) => {
    
    const [queueStateValue, setQueueStateValue] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    
    
    function updateInfo(e) {
        e.preventDefault()
        let newInfo
        try {
            newInfo = {
                queueState: queueStateValue
            }
            console.log(newInfo)
            fetch(`https://t3a2.onrender.com/entries/${entry._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newInfo)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to move entry');
                }
                return response.json();
            })
            .then(data => {
                setErrorMessage(null);
                setSuccessMessage("Entry moved successfully.");
                setQueueEntries(prevArray => prevArray.map(item => (item._id === data._id ? data : item)));
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
        <div className="modal" id={modalID}>
            <div className="modal-background"></div>
            <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Move Entry</p>
                <button className="delete" aria-label="close" onClick={() => closeModal(modalID)}></button>
            </header>
            <form onSubmit={updateInfo}>
            <section className="modal-card-body">
                <DropDown
                labelName="To"
                state={queueStateValue}
                setState={setQueueStateValue}
                entry={entry}
                />
                {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                {successMessage && <p className="has-text-success">{successMessage}</p>}
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success">Save changes</button>
                <button className="button" onClick={() => closeModal(modalID)}>Cancel</button>
            </footer>
            </form>
            </div>
        </div>
    )
}

export default MoveEntry
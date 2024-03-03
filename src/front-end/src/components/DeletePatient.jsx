import { React, useState, useEffect } from 'react'
import { closeModal } from './ModalConfig'

const DeletePatient = ({ patient, modalID, setPatients }) => {
    
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    
    
    function updateInfo(e) {
        e.preventDefault()
        try {
            fetch(`https://t3a2.onrender.com/patients/${patient._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete patient');
                }
                return response.json();
            })
            .then(data => {
                setErrorMessage(null);
                setSuccessMessage("Patient deleted successfully.");
                setPatients(prevArray => prevArray.filter(item => item._id !== data._id));
            })
            .catch(error => {
                console.error(error);
                setErrorMessage("Please try again.");
            })
        } catch (error) {
            console.error(error);
            setErrorMessage("Please try again.");
        }
    }
    
    return (
        <div className="modal" id={modalID}>
            <div className="modal-background"></div>
            <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Confirm Delete Patient?</p>
                <button className="delete" aria-label="close" onClick={() => closeModal(modalID)}></button>
            </header>
            <section className="modal-card-body">
                <button className="button is-danger" 
                    onClick={(e) => {
                        updateInfo(e)
                        closeModal(modalID)
                    }}
                >
                    Yes
                </button>
                <button className="button" onClick={() => closeModal(modalID)}>No</button>
            </section>
            </div>
        </div>
    )
}

export default DeletePatient
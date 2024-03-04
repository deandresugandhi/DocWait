import { React, useState, useEffect } from 'react'
import { openModal, closeModal } from './ModalConfig'
import DeletePatient from './DeletePatient'

const Field = ({ labelName, state, setState, nested=false, patient, fieldName }) => {
    const [placeholderValue, setPlaceholderValue] = useState('');

    useEffect(() => {
        if (patient) {
            if (nested === false) {
                setPlaceholderValue(patient[fieldName]);
            } else if (nested === true) {
                setPlaceholderValue(patient.address[fieldName])
            }
        } else {
          setPlaceholderValue("Loading...");
        }
      }, [patient]);

    return (
        <div className="field">
            <label className={`label ${nested === true ? "is-size-7" : '' }`}>{labelName}</label>
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

const EditPatient = ({ patient, modalId, setPatients }) => {
    
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
    

    function editAddress() {
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
    
        return new Promise((resolve, reject) => {
            fetch(`https://t3a2.onrender.com/addresses/${patient.address._id}`, {
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
                resolve(data);
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
        editAddress()
          .then(newAddress => {
            let newInfo;
            try {
              // Construct the newInfo object conditionally
              newInfo = {
                firstName: firstNameValue.trim() !== '' ? firstNameValue : undefined,
                lastName: lastNameValue.trim() !== '' ? lastNameValue : undefined,
                address: newAddress,
                phoneNumber: phoneNumber.trim() !== '' ? phoneNumber : undefined
              };
      
              // Remove undefined properties from newInfo
              newInfo = Object.fromEntries(Object.entries(newInfo).filter(([_, v]) => v !== undefined));

              fetch(`https://t3a2.onrender.com/patients/${patient._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newInfo)
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Failed to update patient details');
                }
                return response.json();
              })
              .then(data => {
                console.log(data)
                setErrorMessage(null);
                setSuccessMessage("Patient details updated successfully.");
                setPatients(prevArray => prevArray.map(item => (item._id === data._id ? data : item)));
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
        <>
            <div className="modal" id={modalId}>
                <div className="modal-background"></div>
                <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Edit Patient</p>
                    <button className="delete" aria-label="close" onClick={() => closeModal(modalId)}></button>
                </header>
                <form onSubmit={updateInfo}>
                <section className="modal-card-body">
                    <Field labelName="First Name" state={firstNameValue} setState={setFirstNameValue} patient={patient} fieldName="firstName" />
                    <Field labelName="Last Name" state={lastNameValue} setState={setLastNameValue} patient={patient} fieldName="lastName" />
                    <label className="label">Address</label>
                    <div className="box is-fullheight is-fullwidth has-background-light large-rounded-box is-flex is-flex-direction-column">
                        <Field labelName="Unit Number" state={unitNumber} setState={setUnitNumber} nested={true} patient={patient} fieldName="unitNumber" />
                        <Field labelName="Street Number" state={streetNumber} setState={setStreetNumber} nested={true} patient={patient} fieldName="streetNumber"/>
                        <Field labelName="Street Name" state={streetName} setState={setStreetName} nested={true} patient={patient} fieldName="streetName"/>
                        <Field labelName="Suburb" state={suburb} setState={setSuburb} nested={true} patient={patient} fieldName="suburb"/>
                        <Field labelName="State" state={state} setState={setState} nested={true} patient={patient} fieldName="state"/>
                        <Field labelName="Postcode" state={postcode} setState={setPostCode} nested={true} patient={patient} fieldName="postcode"/>
                        <Field labelName="Country" state={country} setState={setCountry}nested={true} patient={patient} fieldName="country"/>
                    </div>
                    <Field labelName="Phone Number" state={phoneNumber} setState={setPhoneNumber} patient={patient} fieldName="phoneNumber" />
                    {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                    {successMessage && <p className="has-text-success">{successMessage}</p>}
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success is-small" type="submit">Save changes</button>
                    <button className="button is-danger is-small" type="button" onClick={() => openModal(`delete-patient-${patient?._id}`)}>Delete Patient</button>
                    <button className="button is-small" type="button" onClick={() => closeModal(modalId)}>Cancel</button>
                </footer>
                </form>
                </div>
            </div>
        <DeletePatient patient={patient} modalID={`delete-patient-${patient?._id}`} setPatients={setPatients}/>
        </>
    )
}

export default EditPatient
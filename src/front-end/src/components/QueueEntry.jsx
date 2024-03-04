import { useState, useEffect, React } from 'react'
import notifIconURL from '../assets/Notification.png'
import tickIconURL from '../assets/Tick.png' 
import crossIconURL from '../assets/Cross.png' 
import optionsIconURL from '../assets/Options.svg' 
import { openModal, closeModal } from './ModalConfig'
import EditPatient from './EditPatient'
import MoveEntry from './MoveEntry'
import DeleteEntry from './DeleteEntry'
import EditPractitioner from './EditPractitioner'

const BoxContainer = ({ children, entry, clickable="false", isMobile="false"}) => (
  <div className={`is-fullwidth box has-background-info entry-rounded-box mt-2 ${clickable === "true" ? 'is-clickable' : ''}`}
      onClick={() =>{openModal(`move-entry-${entry?._id}`)}}
    >
    <div className={`columns ${isMobile === "false" ? "" : "is-mobile" }`}>
      {children}
    </div>
  </div>
);

const CustomerInfo = ({ entry, patient, practitioner, modalId }) => {
  if (entry) {
    const dateObject = new Date(entry.time);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false};
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObject);
    return (
      <div className="column is-three-quarters">
      <div className="details is-flex is-flex-direction-column is-align-items-flex-start is-justify-content-flex-start">
        <h2 className="is-size-6 has-text-weight-semibold">{entry.patient.firstName} {entry.patient.lastName}</h2>
        <div className="is-flex is-flex-direction-row is-align-items-flex-start is-justify-content-flex-start mt-1">
          <button className="button is-small is-rounded has-background-grey-light mr-1"><p>{entry.practitioner.firstName} {entry.practitioner.lastName}</p></button>
          <button className="button is-small is-rounded has-background-grey-lighter"><p>{formattedDate}</p></button>
        </div>
      </div>
      </div>
    )
  }
  else if (patient) {
    const [patientEntry, setPatientEntry] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`https://t3a2.onrender.com/entries/patients/${patient._id}`)
        .then(response => {
          if (!response.ok) {
            setPatientEntry("ERROR");
            return;
          }
          return response.json();
        })
        .then(data => {
          console.log(data)
          setPatientEntry(data)
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error fetching patient data:', error)
          setPatientEntry("ERROR")
          setIsLoading(false)
        });
    }, [patient])

    if (isLoading) {
      return <p>Loading patient data...</p>
    } else {
      console.log(patientEntry)
      const queueState = patientEntry ? patientEntry[0].queueState : "Not in Clinic";
      const dateObject = patientEntry ? new Date(patientEntry[0].time) : "NONE";
      const formattedDate = dateObject !== "NONE" ? dateObject.toISOString().split('T')[0]: "Not in Clinic";
  
      return (
        <>
          <h2 className="column has-text-weight-semibold">{patient.firstName} {patient.lastName}</h2>
          <h2 className={`column has-text-weight-semibold has-text-centered is-flex is-justify-content-center is-align-items-center
              ${queueState === "Not in Clinic" ? 'has-text-danger' : '' }
              ${queueState === "Pending" ? 'has-text-warning' : ''}
              ${queueState === "In progress" ? 'has-text-primary' : ''}
              ${queueState === "Completed" ? 'has-text-success' : ''}
            `}
          >
            {(() => {
              switch (queueState) {
                case "Pending":
                  return "In Queue";
                case "In progress":
                  return "Serving";
                default:
                  return queueState
              }
            })()}
          </h2>
          <h2 className={`column has-text-weight-semibold has-text-right is-hidden-mobile 
              ${formattedDate === "Not in Clinic" ? 'has-text-danger' : '' }
            `}
          >
            {formattedDate}
          </h2>
          <div className="column is-flex is-justify-content-flex-end is-align-items-center">
            <img src={optionsIconURL} className="image is-16x16 is-clickable" onClick={() => openModal(modalId)}/>
          </div>
        </>
      );
    }
  }
  else if (practitioner) {
    return (
      <>
        <h2 className="column has-text-weight-semibold ">{practitioner.firstName} {practitioner.lastName}</h2>
        <div className="column is-flex is-flex-direction-row is-align-items-center is-justify-content-center">
          <div className={`circle 
              ${practitioner.availability === 'On duty' ? 'has-background-success' : ''} 
              ${practitioner.availability === 'Off duty' ? 'has-background-danger' : ''}
            `} 
          />
          <p className={`is-size-6 ml-2 
              ${practitioner.availability === 'On duty' ? 'has-text-success' : ''} 
              ${practitioner.availability === 'Off duty' ? 'has-text-danger' : ''}
            `}
          >
            {practitioner.availability}
          </p>
          </div>
          <div className="column is-flex is-align-items-center is-justify-content-flex-end">
            <img src={optionsIconURL} className="image is-16x16 is-clickable" onClick={() => openModal(modalId)}/>
          </div>
      </>
    )
  }
};

const NotificationIcons = ({entry, columnName}) => (
  <div className="column is-narrow notification is-flex is-flex-direction-row is-align-items-center is-justify-content-center">
    {columnName !== "Completed" && (
      <>
        <img src={notifIconURL} alt="Notif Icon" className="image is-clickable mr-1"/>
        <img src={tickIconURL} alt="Tick Icon" className="image is-clickable mr-1"/>
      </>
    )}
    <img src={crossIconURL} alt="Cross Icon" className="image is-clickable" 
      onClick={(e) => {
        e.stopPropagation()
        openModal(`delete-entry-${entry?._id}`)
    }}/>
  </div>
);

const QueueEntry = ({ entry, patient, practitioner, setPatients, setQueueEntries, setPractitioners, columnName }) => {
  if (entry) {
    return (
      <>
        <BoxContainer clickable="true" entry={entry}>
          <CustomerInfo entry={entry} />
          <NotificationIcons entry={entry} columnName={columnName} />
        </BoxContainer>
        <MoveEntry entry={entry} modalID={`move-entry-${entry?._id}`} setQueueEntries={setQueueEntries}/>
        <DeleteEntry entry={entry} modalID={`delete-entry-${entry?._id}`} setQueueEntries={setQueueEntries}/>
      </>
    )
  }
  else if (patient) {
    return (
      <>
        <BoxContainer isMobile="true">
          <CustomerInfo patient={patient} modalId={`edit-patient-${patient?._id}`} />
        </BoxContainer>
        <EditPatient patient={patient} modalId={`edit-patient-${patient?._id}`} setPatients={setPatients}/>
      </>
    )
  }
  else if (practitioner) {
    return (
      <>
        <BoxContainer isMobile="true">
          <CustomerInfo practitioner={practitioner} modalId={`edit-practitioner-${practitioner?._id}`}/>
        </BoxContainer>
        <EditPractitioner practitioner={practitioner} modalId={`edit-practitioner-${practitioner?._id}`} setPractitioners={setPractitioners}/>
      </>
    )
  }
};

export default QueueEntry
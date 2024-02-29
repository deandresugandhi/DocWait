import { useState, useEffect, React } from 'react'
import notifIconURL from '../assets/Notification.png'
import tickIconURL from '../assets/Tick.png' 
import crossIconURL from '../assets/Cross.png' 
import optionsIconURL from '../assets/Options.svg' 
import { openModal, closeModal } from './ModalConfig'
import EditPatient from './EditPatient'

const BoxContainer = ({ children }) => (
  <div className="box has-background-info entry-rounded-box is-flex is-flex-direction-row p-4 mt-2 pl-5 pr-5">
    {children}
  </div>
);

const CustomerInfo = ( { entry, patient, practitioner, modalId } ) => {
  if (entry) {
    return (
      <div className="is-flex is-flex-direction-column is-align-items-flex-start is-justify-content-flex-start">
        <h2 className="is-size-6 has-text-weight-semibold">{entry.patient.firstName} {entry.patient.lastName}</h2>
        <button className="button is-small is-rounded has-background-grey-lighter"><p>{entry.practitioner.firstName} {entry.practitioner.lastName}</p></button>
      </div>
    )
  }
  else if (patient) {
    const [patientEntry, setPatientEntry] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const fetchData = () => {
        fetch(`https://t3a2.onrender.com/entries/patients/${patient._id}`)
        .then(response => {
          if (!response.ok) {
            setPatientEntry(["ERROR"]);
            return;
          }
          return response.json();
        })
        .then(data => {
          setPatientEntry(data)
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error fetching patient data:', error)
          setPatientEntry(["ERROR"])
          setIsLoading(false)
        });
      }
      fetchData()
    }, [patient])

    if (isLoading) {
      return <p>Loading patient data...</p>
    } else {
      const queueState = patientEntry?.[0]?.queueState || "Not in Clinic";
      const dateObject = patientEntry?.[0]?.time ? new Date(patientEntry[0].time) : "NONE";
      const formattedDate = dateObject === "NONE" ? "Not in Clinic" : dateObject.toISOString().split('T')[0];
  
      return (
        <>
          <h2 className="is-size-6 is-fourth-width has-text-weight-semibold">{patient.firstName} {patient.lastName}</h2>
          <h2 className={`is-size-6 is-fourth-width has-text-weight-semibold has-text-centered 
              ${queueState === "Not in Clinic" ? 'has-text-danger' : '' }
              ${queueState === "Pending" ? 'has-text-warning' : ''}
              ${queueState === "In progress" ? 'has-text-success' : ''}
            `}
          >
            {queueState}
          </h2>
          <h2 className={`is-size-6 is-fourth-width has-text-weight-semibold has-text-right 
              ${formattedDate === "Not in Clinic" ? 'has-text-danger' : '' }
            `}
          >
            {formattedDate}
          </h2>
          <div className="is-fourth-width is-flex is-justify-content-flex-end">
            <img src={optionsIconURL} className="image is-16x16 is-clickable" onClick={() => openModal(modalId)}/>
          </div>
        </>
      );
    }
  }
  else if (practitioner) {
    return (
      <>
        <h2 className="is-size-6 is-half-width has-text-weight-semibold">{practitioner.firstName} {practitioner.lastName}</h2>
      </>
    )
  }
};

const NotificationIcons = () => (
  <div className="container is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-end">
    <img src={notifIconURL} alt="Notif Icon" className="image" />
    <img src={tickIconURL} alt="Tick Icon" className="image is-clickable"/>
    <img src={crossIconURL} alt="Cross Icon" className="image is-clickable"/>
  </div>
);

const QueueEntry = ({ entry, patient, practitioner }) => {
  if (entry) {
    return (
      <BoxContainer>
        <CustomerInfo entry={entry} />
        <NotificationIcons />
      </BoxContainer>
    )
  }
  else if (patient) {
    console.log(patient?._id)
    return (
      <BoxContainer>
        <CustomerInfo patient={patient} modalId={`id_${patient?._id}`} />
        <EditPatient patient={patient} modalId={`id_${patient?._id}`} />
      </BoxContainer>
    )
  }
  else if (practitioner) {
    return (
      <BoxContainer>
        <CustomerInfo practitioner={practitioner} />
        <div className="is-fullwidth is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-start py-1">
          <div className={`circle 
              ${practitioner.availability === 'On duty' ? 'has-background-success' : ''} 
              ${practitioner.availability === 'Absent' ? 'has-background-danger' : ''}
            `} 
          />
          <p className={`is-size-6 ml-2 
              ${practitioner.availability === 'On duty' ? 'has-text-success' : ''} 
              ${practitioner.availability === 'Absent' ? 'has-text-danger' : ''}
            `}
          >
            {practitioner.availability}
          </p>
        </div>
      </BoxContainer>
    )
  }
};

export default QueueEntry
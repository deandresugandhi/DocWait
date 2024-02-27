import { useState, useEffect, React } from 'react'
import notifIconURL from '../assets/Notification.png'
import tickIconURL from '../assets/Tick.png' 
import crossIconURL from '../assets/Cross.png' 

const BoxContainer = ({ children }) => (
  <div className="box p-3 custom-color-2 entry-rounded-box is-flex is-flex-direction-row mt-2">
    {children}
  </div>
);

const CustomerInfo = ( { entry, patient, practitioner } ) => {
  if (entry) {
    return (
      <div className="container is-flex is-flex-direction-column is-align-items-flex-start is-justify-content-flex-start">
        <h2 className="is-size-7 has-text-weight-bold">{entry.patient.firstName} {entry.patient.lastName}</h2>
        <button className="button is-small is-rounded has-background-grey-light"><p>{entry.practitioner.firstName} {entry.practitioner.lastName}</p></button>
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
          <h2 className="is-size-7 third-width has-text-weight-bold">{patient.firstName} {patient.lastName}</h2>
          <h2 className={`is-size-7 has-text-weight-bold has-text-centered third-width 
              ${queueState === "Not in Clinic" ? 'has-text-danger' : '' }
              ${queueState === "Pending" ? 'has-text-warning' : ''}
              ${queueState === "In progress" ? 'has-text-success' : ''}
            `}
          >
            {queueState}
          </h2>
          <h2 className={`is-size-7 has-text-weight-bold has-text-right third-width
              ${formattedDate === "Not in Clinic" ? 'has-text-danger' : '' }
            `}
          >
            {formattedDate}
          </h2>
        </>
      );
    }
  }
  else if (practitioner) {
    return (
      <>
        <h2 className="is-size-7 half-width has-text-weight-bold">{practitioner.firstName} {practitioner.lastName}</h2>
      </>
    )
  }
};

const NotificationIcons = () => (
  <div className="container is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-end">
    <img src={notifIconURL} alt="Notif Icon" className="image is-16x16" />
    <img src={tickIconURL} alt="Tick Icon" className="image is-16x16"/>
    <img src={crossIconURL} alt="Notif Icon" className="image is-16x16"/>
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
    return (
      <BoxContainer>
        <CustomerInfo  patient={patient} />
      </BoxContainer>
    )
  }
  else if (practitioner) {
    return (
      <BoxContainer>
        <CustomerInfo practitioner={practitioner} />
        <div className="py-1 fill-width is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-start">
          <div className="circle" />
          <p className="is-size-7 ml-2">{practitioner.availability}</p>
        </div>
      </BoxContainer>
    )
  }
};

export default QueueEntry
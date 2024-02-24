import React from 'react'
import notifIconURL from '../assets/Notification.png'
import tickIconURL from '../assets/Tick.png' 
import crossIconURL from '../assets/Cross.png' 

const BoxContainer = ({ children }) => (
  <div className="box p-3 custom-color-2 entry-rounded-box is-flex is-flex-direction-row mt-2">
    {children}
  </div>
);

const CustomerInfo = ( { entry, patient } ) => {
  if (entry) {
    return (
      <div className="container is-flex is-flex-direction-column is-align-items-flex-start is-justify-content-flex-start">
        <h2 className="is-size-7 has-text-weight-bold">{entry.patient.firstName} {entry.patient.lastName}</h2>
        <button className="button is-small is-rounded has-background-grey-light"><p>{entry.practitioner.firstName} {entry.practitioner.lastName}</p></button>
      </div>
    )
  }
  else if (patient) {
    return (
      <>
        <h2 className="is-size-7 third-width has-text-weight-bold">{patient.firstName} {patient.lastName}</h2>
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

const QueueEntry = ({ entry, patient }) => {
  if (entry) {
    return (
      <BoxContainer>
        <CustomerInfo  entry={entry} />
        <NotificationIcons />
      </BoxContainer>
    )
  }
  else if (patient) {
    return (
      <BoxContainer>
        <CustomerInfo  patient={patient} />
        <h2 className="is-size-7 has-text-weight-bold has-text-centered third-width">In Queue</h2>
        <h2 className="is-size-7 has-text-weight-bold has-text-right third-width">Today</h2>
      </BoxContainer>
    )
  }
};

export default QueueEntry
import React from 'react'
import notifIconURL from '../assets/Notification.png'
import tickIconURL from '../assets/Tick.png' 
import crossIconURL from '../assets/Cross.png' 

const BoxContainer = ({ children }) => (
  <div className="box p-3 custom-parent-width custom-rounded-box is-flex is-flex-direction-row">
    {children}
  </div>
);

const CustomerInfo = () => (
  <div className="container is-flex is-flex-direction-column is-align-items-flex-start is-justify-content-flex-start">
    <h2 className="is-size-6 has-text-weight-bold">Customer Name</h2>
    <button className="button is-small is-rounded has-background-grey-light"><p>GP Name</p></button>
  </div>
);

const NotificationIcons = () => (
  <div className="container is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-end">
    <img src={notifIconURL} alt="Notif Icon" />
    <img src={tickIconURL} alt="Tick Icon" />
    <img src={crossIconURL} alt="Notif Icon" />
  </div>
);

const QueueEntry = () => (
  <BoxContainer>
    <CustomerInfo />
    <NotificationIcons />
  </BoxContainer>
);

export default QueueEntry
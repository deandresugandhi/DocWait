import React from 'react'
import notifIconURL from '../assets/Notification.png'
import tickIconURL from '../assets/Tick.png' 
import crossIconURL from '../assets/Cross.png' 

const QueueEntry = () => {
  return (
    <div className="queueEntry">
        <img src={notifIconURL} alt="Notif Icon" />
        <img src={tickIconURL} alt="Tick Icon" />
        <img src={crossIconURL} alt="Notif Icon" />
    </div>
  )
}

export default QueueEntry
import { React, useState, useEffect } from 'react'
import QueueColumn from './QueueColumn'


const Home = ({ queueEntries=[], patients=[], practitioners=[], setQueueEntries, loadingQueues }) => {
  const [pendingEntries, setPendingEntries] = useState([])
  const [inProgressEntries, setInProgressEntries] = useState([])
  const [completedEntries, setCompletedEntries] = useState([])
  
  useEffect(() => {
    const entries = queueEntries || [];
    setPendingEntries(entries.filter(entry => entry["queueState"] === "Pending"));
    setInProgressEntries(entries.filter(entry => entry["queueState"] === "In progress"));
    setCompletedEntries(entries.filter(entry => entry["queueState"] === "Completed"));
  }, [queueEntries]);

  return (
    <>
      <div className='is-fullwidth is-fullheight is-marginless is-flex is-flex-direction-column'>
        <h2 className='is-size-4'>Welcome Back,</h2>
        <h1 className='is-size-1 mb-3 has-text-weight-bold'>Clinic Name</h1>
        <div className='columns is-multiline is-fullheight is-overflow is-3'>
          <QueueColumn columnName="In Queue" state={pendingEntries} patients={patients} practitioners={practitioners} queueState="Pending" setQueueEntries={setQueueEntries} loadingQueues={loadingQueues}/>
          <QueueColumn columnName="Serving" state={inProgressEntries} patients={patients} practitioners={practitioners} queueState="In progress" setQueueEntries={setQueueEntries} loadingQueues={loadingQueues}/>
          <QueueColumn columnName="Completed" state={completedEntries} patients={patients} practitioners={practitioners} queueState="Completed" setQueueEntries={setQueueEntries} loadingQueues={loadingQueues}/>
        </div>
      </div>
    </>
  )
}

export default Home
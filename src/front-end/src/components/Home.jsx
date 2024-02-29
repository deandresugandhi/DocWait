import { React, useState, useEffect } from 'react'
import QueueColumn from './QueueColumn'
import AddEntry from './AddEntry'


const Home = ({ queueEntries=[], patients=[], practitioners=[] }) => {
  const [pendingEntries, setPendingEntries] = useState([])
  const [inProgressEntries, setInProgressEntries] = useState([])
  const [completedEntries, setCompletedEntries] = useState([])
  useEffect(() => {
    const entries = queueEntries.filter(entry => entry["queueState"] === "Pending")
    setPendingEntries(entries)
  }, [queueEntries]);

  useEffect(() => {
    const entries = queueEntries.filter(entry => entry["queueState"] === "In progress")
    setInProgressEntries(entries)
  }, [queueEntries]);

  useEffect(() => {
    const entries = queueEntries.filter(entry => entry["queueState"] === "Completed")
    setCompletedEntries(entries)
  }, [queueEntries]);

  return (
    <>
      <div className='is-fullwidth is-fullheight is-marginless is-flex is-flex-direction-column ml-3'>
        <h2 className='is-size-4'>Welcome Back,</h2>
        <h1 className='is-size-1 mb-3 has-text-weight-bold'>Clinic Name</h1>
        <div className='is-fullheight is-overflow is-marginless is-flex is-flex-direction-row'>
          <QueueColumn columnName="In Queue" state={pendingEntries}/>
          <QueueColumn columnName="Serving" state={inProgressEntries}/>
          <QueueColumn columnName="Completed" state={completedEntries}/>
        </div>
        <AddEntry patients={patients} practitioners={practitioners}/>
      </div>
    </>
  )
}

export default Home
import { useState, useEffect, React } from 'react'
import QueueEntry from './QueueEntry'

const Home = ({ queueEntries=[] }) => {
  return (
    <>
      <div>Home</div>
      <ul>
        {queueEntries.map((entry, index) => (
          <li key={index}>
            <QueueEntry entry={entry} />
          </li>          
        ))}
        </ul>
    </>
  )
}

export default Home
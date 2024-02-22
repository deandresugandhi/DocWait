import { useState, useEffect, React } from 'react'
import Home from './Home'
import Settings from './Settings'
import Customers from './Customers'
import AboutUs from './AboutUs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  const [patients, setPatients] = useState([])
  const [queueEntries, setEntries] = useState([])

  useEffect(() => {
      fetch('https://t3a2.onrender.com/patients')
      .then(res => res.json())
      .then(data => setPatients(data))
  }, [])

  useEffect(() => {
      fetch('https://t3a2.onrender.com/entries')
      .then(res => res.json())
      .then(data => setEntries(data))
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home queueEntries={queueEntries}/>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<h3>Page Not Found</h3>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
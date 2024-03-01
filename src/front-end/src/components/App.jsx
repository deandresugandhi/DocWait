import { useState, useEffect, React } from 'react'
import Home from './Home'
import SettingsManagePractitioner from './SettingsManagePractitioner'
import SettingsUpdateInformation from './SettingsUpdateInformation'
import Customers from './Customers'
import AboutUs from './AboutUs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminNavBar from './AdminNavBar'

const App = () => {
  const [patients, setPatients] = useState([])
  const [queueEntries, setQueueEntries] = useState([])
  const [practitioners, setPractitioners] = useState([])
  const [clinic, setClinic] = useState([])
  const [openingHours, setOpeningHours] = useState([])

  useEffect(() => {
      fetch('https://t3a2.onrender.com/patients')
      .then(res => res.json())
      .then(data => {
        setPatients(data)
      })
  }, [])

  useEffect(() => {
      fetch('https://t3a2.onrender.com/entries')
      .then(res => res.json())
      .then(data => setQueueEntries(data))
  }, [])

  useEffect(() => {
    fetch('https://t3a2.onrender.com/practitioners')
    .then(res => res.json())
    .then(data => setPractitioners(data))
  }, [])

  useEffect(() => {
    fetch('https://t3a2.onrender.com/clinic')
    .then(res => res.json())
    .then(data => {
      setClinic(data)
    })
  }, [])

  useEffect(() => {
    fetch('https://t3a2.onrender.com/opening_hours')
    .then(res => res.json())
    .then(data => {
      setOpeningHours(data)
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        <div className='is-fullheight is-marginless is-flex is-flex-direction-row'>
          <AdminNavBar />
          <Routes>
            <Route path="/" element={<Home queueEntries={queueEntries} patients={patients} practitioners={practitioners} setQueueEntries={setQueueEntries} />} />
            <Route path="/settings/manage-practitioners" element={<SettingsManagePractitioner practitioners={practitioners} setPractitioners={setPractitioners}/>} />
            <Route path="/settings/update-information" element={<SettingsUpdateInformation clinic={clinic} openingHours={openingHours}/>} />
            <Route path="/customers" element={<Customers patients={patients} setPatients={setPatients}/>} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<h3>Page Not Found</h3>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
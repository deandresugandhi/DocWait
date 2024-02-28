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
  const [queueEntries, setEntries] = useState([])
  const [practitioners, setPractitioners] = useState([])
  const [clinic, setClinic] = useState([])

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
      .then(data => setEntries(data))
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

  return (
    <>
      <BrowserRouter>
        <div className='is-fullheight is-marginless is-flex is-flex-direction-row'>
          <AdminNavBar />
          <Routes>
            <Route path="/" element={<Home queueEntries={queueEntries} patients={patients} practitioners={practitioners}/>} />
            <Route path="/settings/manage-practitioners" element={<SettingsManagePractitioner practitioners={practitioners}/>} />
            <Route path="/settings/update-information" element={<SettingsUpdateInformation clinic={clinic}/>} />
            <Route path="/customers" element={<Customers patients={patients}/>} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<h3>Page Not Found</h3>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
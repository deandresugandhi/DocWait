import { useState, useEffect, React } from 'react'
import Home from './Home'
import SettingsManagePractitioner from './SettingsManagePractitioner'
import SettingsUpdateInformation from './SettingsUpdateInformation'
import Customers from './Customers'
import AboutUs from './AboutUs'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import AdminNavBar from './AdminNavBar'
import PatientHome from './PatientHome'
import PatientPracticioner from './PatientPracticioner'
import PatientQueue from './PatientQueue'
import PatientTime from './PatientTime'
import PatientDetails from './PatientDetails'
import PatientConfirmation from './PatientConfirmation'

const MainContent = ({ queueEntries, patients, practitioners, clinic, openingHours, setQueueEntries, setPatients, setPractitioners, setClinic, setOpeningHours }) => {
  const location = useLocation()
  const isPatientRoute = location.pathname.startsWith('/patient')

  if (isPatientRoute) {
    // Patient-specific container and styling
    return (
      <>
        <div className='patient-specific-class'>
          <Routes>
            <Route path="/patient" element={<PatientHome />} />
            <Route path="/patient/practicioner" element={<PatientPracticioner />} />
            <Route path="/patient/queue" element={<PatientQueue />} />
            <Route path="/patient/time" element={<PatientTime />} />
            <Route path="/patient/details" element={<PatientDetails />} />
            <Route path="/patient/confirmation" element={<PatientConfirmation />} />
          </Routes>
        </div>
      </>
    );
  } else {
    // Admin and general routes container and styling
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
    );
  }
}

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

  useEffect(() => {
    fetch('https://t3a2.onrender.com/opening_hours')
    .then(res => res.json())
    .then(data => {
      setOpeningHours(data)
    })
  }, [])

  return (
    <BrowserRouter>
      <MainContent queueEntries={queueEntries} patients={patients} practitioners={practitioners} clinic={clinic} openingHours={openingHours} setQueueEntries={setQueueEntries} setPatients={setPatients} setPractitioners={setPractitioners} setClinic={setClinic} setOpeningHours={setOpeningHours} />
    </BrowserRouter>
  );
}

export default App
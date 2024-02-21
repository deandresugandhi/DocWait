import React from 'react'
import Home from './Home'
import Settings from './Settings'
import Customers from './Customers'
import AboutUs from './AboutUs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  const queueEntries = [
    {
      name: "John Doe",
      gp: "Doe John"
    },
    {
      name: "Jane Doe",
      gp: "Doe Jane"
    },
    {
      name: "Bob Doe",
      gp: "Doe Bob"
    },
    {
      name: "Babe Doe",
      gp: "Doe Babe"
    },

  ]
  return (
    <>
      <h1>QueueMate</h1>
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
import React from 'react'
import Home from './Home'
import Settings from './Settings'
import Customers from './Customers'
import AboutUs from  './AboutUs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <h1>QueueMate</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
      {/* <Home />
      <Customers />
      <AboutUs />
      <Settings /> */}
    </>
  )
}

export default App

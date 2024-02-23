import React from 'react'
import homeIconURL from '../assets/Home.png'
import customerIconURL from '../assets/People.png' 
import aboutUsIconURL from '../assets/Info Circle.png' 
import settingsIconURL from '../assets/Settings.png' 
import logoURL from '../assets/Logo.png'
import { Link } from "react-router-dom"

const BoxContainer = ({ children }) => (
  <div className="box navbar-padding navbar-color navbar-width navbar-rounded-box is-flex is-flex-direction-column">
    {children}
  </div>
);

const LinkContainer = ({ imageURL, linkName, position }) => {
  let settings = "navbar-container-size no-margin is-flex is-flex-direction-row is-align-items-flex-end is-justify-content-flex-start"
  if (position === 'bottom') {
    settings += " is-flex-grow-1"
  }
  return (
    <div className={ settings }>
      <img src={ imageURL } alt={ linkName } className='navbar-icon'/>
      <h2 className="medium navbar-text has-text-white navbar-text-margin">{ linkName }</h2>
    </div>
  )
};

const AdminNavBar = () => (
  <BoxContainer>
    <img src={ logoURL } alt='Logo' className='logo-size' />
    <Link to="/">
      <LinkContainer imageURL={homeIconURL} linkName="Queue" />
    </Link>
    <Link to="/customers">
      <LinkContainer imageURL={customerIconURL} linkName="Customer" />
    </Link>
    <Link to="/about-us">
      <LinkContainer imageURL={aboutUsIconURL} linkName="About Us" />
    </Link>
    <Link to="/about-us">
      <LinkContainer imageURL={settingsIconURL} linkName="Settings" position="bottom"/>
    </Link>
  </BoxContainer>
);

export default AdminNavBar
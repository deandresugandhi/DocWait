import React from 'react'
import homeIconURL from '../assets/Home.png'
import customerIconURL from '../assets/People.png' 
import aboutUsIconURL from '../assets/Info Circle.png' 
import settingsIconURL from '../assets/Settings.png' 

const BoxContainer = ({ children }) => (
  <div className="box p-3 custom-width-3 custom-rounded-box is-flex is-flex-direction-column">
    {children}
  </div>
);

const LinkContainer = ({ imageURL, linkName }) => (
  <div className="container is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-end">
    <img src={ imageURL } alt={ linkName } />
    <h2 className="is-size-7 has-text-weight-bold">{ linkName }</h2>
  </div>
);

const AdminNavBar = ({ entry }) => (
  <BoxContainer>
    <LinkContainer imageURL={homeIconURL} linkName="Home" />
    <LinkContainer imageURL={customerIconURL} linkName="Customer" />
    <LinkContainer imageURL={aboutUsIconURL} linkName="About Us" />
    <LinkContainer imageURL={settingsIconURL} linkName="Settings" />
  </BoxContainer>
);

export default AdminNavBar
import { React, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import homeIconURL from '../assets/Home.png';
import customerIconURL from '../assets/People.png';
import aboutUsIconURL from '../assets/Info Circle.png';
import settingsIconURL from '../assets/Settings.png';
import logoURL from '../assets/Logo.png';

const BoxContainer = ({ children }) => (
  <aside className="menu admin-navbar has-background-dark large-rounded-box is-flex is-flex-direction-column py-6 px-4">
    {children}
  </aside>
);

const LinkContainer = ({ imageURL, linkName, path, position, topNavBar=false }) => {
  let settings = 'is-fullwidth is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-start mb-2 navbar-rounded'
  const location = useLocation()
  const isActive = () => {
    if (linkName === 'Settings') {
      return location.pathname.startsWith('/settings/')
    }
    else {
      return location.pathname === path
    }
  }

  if (position === 'bottom') {
    settings += ' is-flex-grow-1'
  }

  if (topNavBar === false) {
    return (
      <li className={`${settings} ${isActive() ? 'navbar-active' : ''}`}>
        <NavLink
          to={path}
          className="py-2 is-fullwidth is-fullheight navbar-rounded"
        >
          <img src={imageURL} alt={linkName} className="navbar-icon" />
          <span className="has-text-weight-light">{linkName}</span>
        </NavLink>
      </li>
    )
  } else {
    return (
      <a className={`navbar-item ${isActive() ? 'navbar-active' : ''}`}>
        <NavLink
          to={path}
          className="px-5"
        >
          <img src={imageURL} alt={linkName} className="navbar-icon" />
          <span className="has-text-weight-light is-size-7">{linkName}</span>
        </NavLink>
      </a>
    )
  }
};

const AdminNavBar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
  <>
  <BoxContainer>
    <img src={logoURL} alt="Logo" className="logo-size" />
    <ul className="mb-3 menu-list medium">
      <LinkContainer imageURL={homeIconURL} linkName="Queue" path="/" />
      <LinkContainer imageURL={customerIconURL} linkName="Customer" path="/customers" />
      <LinkContainer imageURL={aboutUsIconURL} linkName="About Us" path="/about-us" />
      <LinkContainer imageURL={settingsIconURL} linkName="Settings" path="/settings/manage-practitioners" position="bottom"/>
    </ul>
  </BoxContainer>
  
  <nav className="navbar has-background-dark is-fixed-top" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item px-6">
        <img src={logoURL} />
      </a>
      <a
        onClick={() => {
          setIsActive(!isActive);
        }} 
        role="button" 
        className={`navbar-burger burger ${isActive ? "is-active" : ""}`} 
        aria-label="menu" 
        aria-expanded="false" 
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className={`navbar-menu has-background-dark ${isActive ? "is-active" : ""}`}>
      <div className="navbar-start">
        <LinkContainer imageURL={homeIconURL} linkName="Queue" path="/" topNavBar={true} />
        <LinkContainer imageURL={customerIconURL} linkName="Customer" path="/customers" topNavBar={true} />
        <LinkContainer imageURL={aboutUsIconURL} linkName="About Us" path="/about-us" topNavBar={true} />
        <LinkContainer imageURL={settingsIconURL} linkName="Settings" path="/settings/manage-practitioners" topNavBar={true}/>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary">
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  </>
  )
}
export default AdminNavBar;
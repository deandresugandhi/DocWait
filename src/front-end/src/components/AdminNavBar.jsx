import React from 'react';
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

const LinkContainer = ({ imageURL, linkName, path, position }) => {
  let settings = 'is-fullwidth is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-start py-2 '
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

  return (
    <li className={`${settings}`}>
      <NavLink
        to={path}
        className={`${settings} ${isActive() ? 'navbar-active' : ''}`}
      >
        <img src={imageURL} alt={linkName} className="navbar-icon" />
        <span className="has-text-weight-light">{linkName}</span>
      </NavLink>
    </li>
  );
};

const AdminNavBar = () => (
  <BoxContainer>
    <img src={logoURL} alt="Logo" className="logo-size" />
    <ul className="mb-3 menu-list medium">
      <LinkContainer imageURL={homeIconURL} linkName="Queue" path="/" />
      <LinkContainer imageURL={customerIconURL} linkName="Customer" path="/customers" />
      <LinkContainer imageURL={aboutUsIconURL} linkName="About Us" path="/about-us" />
      <LinkContainer imageURL={settingsIconURL} linkName="Settings" path="/settings/manage-practitioners" position="bottom"/>
    </ul>
  </BoxContainer>
);

export default AdminNavBar;
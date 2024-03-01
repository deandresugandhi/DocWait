import React from 'react';
import { NavLink } from 'react-router-dom';


const BoxContainer = ({ children }) => (
  <aside className="menu settings-navbar has-background-primary large-rounded-box is-flex is-flex-direction-column py-5 px-4">
    {children}
  </aside>
);

const LinkContainer = ({ linkName, path, position }) => {
  let settings = 'is-fullwidth is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-start py-2 ';
  if (position === 'bottom') {
    settings += ' is-flex-grow-1';
  }

  return (
    <li className={`${settings}`}>
      <NavLink
        to={path}
        className={({ isActive }) => `${settings} ${isActive ? 'navbar-active' : ''}`}
      >
        <span className="has-text-weight-light">{linkName}</span>
      </NavLink>
    </li>
  );
};

const SettingsNavBar = () => (
  <BoxContainer>
    <ul className="mb-3 menu-list medium">
      <LinkContainer linkName="Manage Practitioners" path="/settings/manage-practitioners" />
      <LinkContainer linkName="Update Information" path="/settings/update-information" />
    </ul>
  </BoxContainer>
);

export default SettingsNavBar;
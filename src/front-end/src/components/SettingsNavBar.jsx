import React from 'react';
import { NavLink } from 'react-router-dom';


const BoxContainer = ({ children }) => (
  <aside className="menu py-5 px-4 settings-navbar large-rounded-box is-flex is-flex-direction-column">
    {children}
  </aside>
);

const LinkContainer = ({ linkName, path, position }) => {
  let settings = 'py-2 fill-width is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-start';
  if (position === 'bottom') {
    settings += ' is-flex-grow-1';
  }

  return (
    <li className={`${settings}`}>
      <NavLink
        to={path}
        className={({ isActive }) => `${settings} ${isActive ? 'navbar-active' : ''}`}
      >
        <span className="light">{linkName}</span>
      </NavLink>
    </li>
  );
};

const SettingsNavBar = () => (
  <BoxContainer>
    <ul className="mb-3 menu-list medium">
      <LinkContainer linkName="Manage Practitioners" path="/settings/manage-practitioners" />
      <LinkContainer linkName="Update Information" path="/customers/update-information" />
      <LinkContainer linkName="Notification Settings" path="/about-us" />
    </ul>
  </BoxContainer>
);

export default SettingsNavBar;
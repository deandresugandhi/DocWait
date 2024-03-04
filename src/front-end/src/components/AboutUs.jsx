import React from 'react'
import AdminNavBar from './AdminNavBar'

const AboutUs = ({ }) => {
  return (
    <>
      <div className='is-fullwidth is-flex is-flex-direction-column'>
        <h1 className='is-size-4'>DOC WAIT</h1>
        <h1 className='is-size-1 has-text-weight-bold mb-3'>About Us</h1>
        <div className="box is-fullwidth is-fullheight is-overflow has-background-light large-rounded-box is-flex is-flex-direction-column">
          <h1 className='is-size-2-mobile is-size-2-tablet has-text-weight-bold mb-2'>Our Mission</h1>
          <p className="is-size-5 is-three-fourth-width has-text-weight-light mb-6">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
            <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in </span>
            <span>reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, </span>
            <span>sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
          </p>
          <h1 className='is-size-2-mobile is-size-2-tablet has-text-weight-bold mb-2'>Our Team</h1>
          <p className="is-size-5 is-three-fourth-width has-text-weight-light">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
            <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in </span>
            <span>reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, </span>
            <span>sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutUs
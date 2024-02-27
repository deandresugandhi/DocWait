import React from 'react'
import AdminNavBar from './AdminNavBar'

const AboutUs = ({ }) => {
  return (
    <>
      <div className='full-height is-marginless is-flex is-flex-direction-row'>
        <AdminNavBar />
        <div className='is-marginless fill-width is-flex is-flex-direction-column ml-3'>
          <h1 className='is-size-4'>DOC WAIT</h1>
          <h1 className='black is-size-1 mb-3'>About Us</h1>
          <div className="box fill-width fill-height custom-color large-rounded-box is-flex is-flex-direction-column">
            <h1 className='bold is-size-2-mobile is-size-2-tablet'>Our Mission</h1>
            <p class="is-size-5 three-fourth-width">
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
              <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in </span>
              <span>reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, </span>
              <span>sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
            </p>
            <h1 className='bold is-size-2-mobile is-size-2-tablet'>Our Team</h1>
            <p class="is-size-5 three-fourth-width">
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
              <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in </span>
              <span>reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, </span>
              <span>sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs
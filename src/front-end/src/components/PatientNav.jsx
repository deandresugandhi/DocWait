import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientNav = ({ previousDisabled, nextDisabled, previousPage, nextPage }) => {
  let navigate = useNavigate();

  //  Go back to the previous page in the history stack
  const handlePreviousClick = () => {
    if (previousPage) {
      navigate(previousPage);
    } else {
      navigate(-1);
    }
  };

  //  Go to the next page in the stack
  const handleNextClick = () => {
    if (nextPage) {
      navigate(nextPage);
    }
  
  };
  
  // Return the navigation buttons
  return (
    <>
      <nav className="pagination" role="navigation" aria-label="pagination">
          <a className={`pagination-previous ${previousDisabled ? 'is-disabled' : ''}`} 
             onClick={handlePreviousClick} 
             title="This is the first page">Previous</a>
          {!nextDisabled && (
            <a className="pagination-next" onClick={handleNextClick}>Next page</a>
          )}
      </nav>
    </>
  );
}

export default PatientNav;

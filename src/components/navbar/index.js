import React from 'react';
import PropTypes from "prop-types";
import './styles.css';

function Navbar({children}) {
  return (
    <div className='Navbar'>
      {children}
    </div>
  );
}

Navbar.propTypes = {
  children: PropTypes.node,
}

export default React.memo(Navbar);

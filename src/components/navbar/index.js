import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
  return <NavLink to={`/`}>Главная</NavLink>;
};

export default React.memo(Navbar);

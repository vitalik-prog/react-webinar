import React from "react";
import './styles.css';

function Layout({head, center, children}){
  return (
    <div className='Layout'>
      <div className='Layout__head'>
        {head}
      </div>
      <div className='Layout__center'>
        {children}>
      </div>
    </div>
  )
}

export default Layout;
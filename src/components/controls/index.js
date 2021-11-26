import React from "react";
import propTypes from 'prop-types';
import './styles.css';

function Controls({ onShowModal, totalInfoElement }){
  console.log('Controls');

  return (
    <div className='Controls'>
      <span className={'Controls__specifications'}>
        В корзине: <strong>{totalInfoElement}</strong>
      </span>
      <button onClick={onShowModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onShowModal: propTypes.func.isRequired,
  totalInfoElement: propTypes.element
}

Controls.defaultProps = {
  onShowModal: () => {},
  totalInfoElement: <span> </span>
}

export default React.memo(Controls);
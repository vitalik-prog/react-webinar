import React from 'react';
import propTypes from "prop-types";
import './styles.css';

const Modal = ({active, isContentExist, onClose, children}) => {
  console.log('Modal')
  return (
    <div className={active? "Modal active" : "Modal"} onClick={onClose}>
      <div className={active? "Modal__body active" : "Modal__body"} onClick={e => e.stopPropagation()}>
        <div className="Modal__header">
          <h2>Корзина</h2>
          <button onClick={onClose}>Закрыть</button>
        </div>
        {isContentExist
          ?
          (<div>
            {children}
          </div>)
          :
          (<div className="Modal__empty">
            <h4>Корзина пуста, добавьте товары</h4>
          </div>)
        }
      </div>
    </div>
  );
};

Modal.propTypes = {
  isContentExist: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired
}

Modal.defaultProps = {
  isContentExist: false,
  onClose: () => {}
}

export default React.memo(Modal);

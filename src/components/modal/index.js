import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import './styles.css';

const Modal = ({active, onClose, children}) => {
  console.log('Modal')
  const [classes, setClasses] = useState({ overlayClasses: 'Modal', modalBodyClasses: 'Modal__body' })

  const escPressCatcher = useCallback(e => {
    if (e.key === 'Escape' && active) {
      handleCloseModal()
    }
  }, [active])

  useEffect(() => {
    document.addEventListener('keydown', escPressCatcher)
    return () => document.removeEventListener('keydown', escPressCatcher)
  }, [escPressCatcher])

  // for animation on open modal
  useEffect(() => {
    if (active) {
      setClasses({ overlayClasses: 'Modal active', modalBodyClasses: 'Modal__body active' })
    }
  }, [active])

  // for animation on close modal
  const handleCloseModal = () => {
    setClasses({ overlayClasses: 'Modal', modalBodyClasses: 'Modal__body' })
    // timeout is need to give possibility css animation working correctly
    setTimeout(() => {
      onClose()
    }, 500)
  }

  return (
    <div className={classes.overlayClasses} onClick={handleCloseModal}>
      <div className={classes.modalBodyClasses} onClick={e => e.stopPropagation()}>
        <div className="Modal__header">
          <h2>Корзина</h2>
          <button onClick={handleCloseModal}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  active: propTypes.bool,
  onClose: propTypes.func.isRequired
}

Modal.defaultProps = {
  active: false,
  onClose: () => {}
}

export default React.memo(Modal);

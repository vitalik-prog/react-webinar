import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import './styles.css';

const Modal = ({active, onClose, children}) => {
  console.log('Modal')
  const [classes, setClasses] = useState({ overlayClasses: 'Modal', modalBodyClasses: 'Modal__body' })

  const keyPress = useCallback(e => {
    if (e.key === 'Escape' && active) {
      onClose()
    }
  }, [active])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  useEffect(() => {
    if (active) {
      setClasses({ overlayClasses: 'Modal active', modalBodyClasses: 'Modal__body active' })
    }
  }, [active])

  return (
    <div className={classes.overlayClasses} onClick={onClose}>
      <div className={classes.modalBodyClasses} onClick={e => e.stopPropagation()}>
        <div className="Modal__header">
          <h2>Корзина</h2>
          <button onClick={onClose}>Закрыть</button>
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

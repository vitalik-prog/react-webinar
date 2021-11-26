import React, {useCallback, useEffect} from 'react';
import propTypes from "prop-types";
import './styles.css';

const Modal = ({active, onClose, children}) => {
  console.log('Modal')

  const keyPress = useCallback(e => {
    if (e.key === 'Escape' && active) {
      onClose()
    }
  }, [active])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return (
    <div className={active? "Modal active" : "Modal"} onClick={onClose}>
      <div className={active? "Modal__body active" : "Modal__body"} onClick={e => e.stopPropagation()}>
        <div className="Modal__header">
          <h2>Корзина</h2>
          <button onClick={onClose}>Закрыть</button>
        </div>
        {children}
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

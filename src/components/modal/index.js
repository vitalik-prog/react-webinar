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

  useEffect(() => {
    if (active) {
      const modalOverlayElement = document.querySelector(".Modal")
      const modalBodyElement = document.querySelector(".Modal__body")
      modalOverlayElement.classList.add("active");
      modalBodyElement.classList.add("active");
      return () => {
        modalOverlayElement.classList.remove("active");
        modalBodyElement.classList.remove("active");
      }
    }
  }, [active])

  return (
    <div className="Modal" onClick={onClose}>
      <div className="Modal__body" onClick={e => e.stopPropagation()}>
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

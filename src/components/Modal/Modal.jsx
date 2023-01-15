import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ onClose, largeImageURL, keyClose, overlayClick }) => {
  useEffect(() => {
    const keyClose = e => {
      if (e.key === 'Escape' && e.target === e.currentTarget) {
        onClose();
      }
    };
    window.addEventListener('keydown', keyClose);

    return () => {
      window.removeEventListener('keydown', keyClose);
    };
  }, [onClose]);

  
  return (
    <div onClick={overlayClick} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};
export default Modal;

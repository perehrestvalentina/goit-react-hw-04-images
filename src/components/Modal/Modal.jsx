import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    const keyClose = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', keyClose);
    return () => document.removeEventListener('keydown', keyClose);
  }, [onClose]);

  const overlayClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div onClick={overlayClick} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = PropTypes.shape({
  largeImageUR: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}).isRequired;

export default Modal;

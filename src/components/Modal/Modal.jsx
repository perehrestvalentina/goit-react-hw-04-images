import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.keyClose);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyClose);
  }
  keyClose = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };
  overlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div onClick={this.overlayClick} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};
export default Modal;

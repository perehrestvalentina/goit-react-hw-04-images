import { useState } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  selectedImage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModalByClick = e => {
    if (e.target.nodeName !== 'IMG') {
      setIsModalOpen(false);
    }
  };
  const closeModalByEsc = () => setIsModalOpen(false);
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        onClick={openModal}
      />
      {isModalOpen && (
        <Modal
          src={largeImageURL}
          alt={tags}
          onClickClose={closeModalByClick}
          onEscClose={closeModalByEsc}
        />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    selectedImage: PropTypes.func,
  }),
};
export default ImageGalleryItem;

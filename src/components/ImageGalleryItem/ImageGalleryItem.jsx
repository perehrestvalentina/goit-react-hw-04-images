import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  selectedImage,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        onClick={() => selectedImage(largeImageURL, tags)}
      />
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

import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ data }) => {
  return (
    <ul className={css.ImageGallery}>
      {data.map(({ id, ...otherProps }) => {
        return <ImageGalleryItem key={id} {...otherProps} />;
      })}
    </ul>
  );
};

ImageGallery.propType = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGallery;

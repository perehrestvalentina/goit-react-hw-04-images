import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import fetchImages from 'apiHelpers';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import css from './App.module.css';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imgTags, setImgTags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    getApi(imageName, page);
  }, [imageName, page]);

  const getApi = (findImage, numberPage) => {
    if (!findImage) return;

    async function imageApi() {
      try {
        setIsLoading(true);
        const getImages = await fetchImages(findImage, numberPage);

        if (findImage.trim() === '' || getImages.length === 0) {
          return toast.error(`no picture with name ${findImage}`);
        }
        setImages([...images, ...getImages]);
      } catch (error) {
        return toast.error('we can not find');
      } finally {
        setIsLoading(false);
      }
    }
    imageApi();
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getFindImage = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };
  const handleSelectedImage = (largeImageURL, imgTags) => {
    setLargeImageURL(largeImageURL);
    setImgTags(imgTags);
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={getFindImage} />
      {isLoading && (
        <div className={css.loading}>
          <Loader />
        </div>
      )}

      {!imageName && <p className={css.looking}>What do you want to find? </p>}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} selectedImage={handleSelectedImage} />
          <Button loadMore={loadMore} />
        </>
      )}
      {largeImageURL && (
        <Modal
          largeImageURL={largeImageURL}
          imgTags={imgTags}
          onClose={() => setLargeImageURL('')}
        >
          <img src={largeImageURL} alt={imgTags} />
        </Modal>
      )}
      <Toaster />
    </div>
  );
};

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import fetchImages from 'apiHelpers';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import css from './App.module.css';

export function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages, ges] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    getApi(imageName, page);
  }, [imageName, page]);

  function getApi(findImage, numberPage) {
    if (!findImage) return;

    async function imageApi() {
      try {
        setIsLoading(true);
        const getImages = await fetchImages(findImage, numberPage);

        if (findImage.trim() === '' || getImages.length === 0) {
          return toast.error(`no picture with name ${findImage}`, {
            icon: '🥺',
          });
        }
        setImages([...images, ...getImages]);
      } catch (error) {
        return toast.error('we can not find');
      } finally {
        setIsLoading(false);
      }
    }
    imageApi();
  }

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getFindImage = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };
  const handleSelectedImage = (largeImageURL, total) => {
    setLargeImageURL(largeImageURL);
    setTotal(total);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={getFindImage} selectedImage={handleSelectedImage} />

      <ImageGallery images={images} />

      {images.length && total !== page && !isLoading && (
        <Button loadMore={loadMore} />
      )}

      {isLoading && <Loader />}

      <Toaster />
    </div>
  );
}

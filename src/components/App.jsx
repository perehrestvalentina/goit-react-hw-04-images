import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import fetchImages from 'apiHelpers';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import css from './App.module.css';

const COUNTER_PAGE = 12;

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (imageName === '') return;

    const findImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetchImages(imageName, page);
        const data = response.totalHits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );

        setImages(prevImages => [...prevImages, ...data]);
        setTotal(Math.ceil(response.totalHits / COUNTER_PAGE));
        setIsLoading(false);

        if (response.totalHits < 1)
          toast.error(
            `no picture with name ${imageName}, check what you enter`
          );
      } catch {
        toast.error('sorry image not found');
      }
    };
    findImages();
  }, [imageName, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getFindImage = value => {
    if (setImageName === value) {
      toast.error('Please enter a new search query');
      return;
    }
    setImageName(value);
    setImages([]);
    setPage(1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={getFindImage} />
      <ImageGallery data={images} />

      {images.length > COUNTER_PAGE && total !== page && !isLoading && (
        <Button loadMore={loadMore} />
      )}

      {isLoading && <Loader />}

      <Toaster />
    </div>
  );
};

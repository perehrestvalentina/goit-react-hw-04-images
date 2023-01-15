import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
// import Modal from './Modal';
import Loader from './Loader';
import Button from './Button';
import fetchImages from 'apiHelpers';

import css from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [total, setTotal] = useState(0);
  const [largeImageURL, setlargeImageURL] = useState('');

  useEffect(
    () => {
      const findImages = {
        seachImage: imageName,
        firstPage: page,
      };
      if (!imageName) {
        fetchImages(findImages);
      }
    },

    function fetchData(findImages) {
      try {
        const responce = fetchImages(findImages);

        if (responce.totalHits === 0) {
          toast.error(
            `no picture with name ${imageName}, check what you enter`
          );
          setStatus(Status.RESOLVED);
          return;
        }

        setImages(prevImages => [...prevImages, ...responce.hits]);
        setStatus(Status.REJECTED);
        setTotal(responce.totalHits);
      } catch (error) {
        toast.error('sorry image not found');
        setStatus(Status.REJECTED);
      }
    },
    [imageName, page]
  );

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setStatus(status.IDLE);
  };
  const getFindImage = value => {
    const filterValue = value.trim().toLowercase();
    setPage(1);
    setImages([]);
    setImageName('');
    setStatus(Status.IDLE);
    setTotal(0);
    setlargeImageURL('');
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={getFindImage} />

      {Status.PENDING && (
        <div className={css.loading}>
          <Loader />
        </div>
      )}

      {images.length > 0 && (
        <>
          <ImageGallery images={images} />

          {Status.RESOLVED && <Button loadMore={loadMore} />}
        </>
      )}
      <Toaster />
    </div>
  );
};

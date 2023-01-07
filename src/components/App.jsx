import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Loader from './Loader';
import Button from './Button';
import fetchImages from 'apiHelpers';

import css from './App.module.css';

export class App extends Component {
  state = {
    imageName: '',
    images: [],
    status: 'idle',
    error: null,
    largeImageURL: '',
    imgTags: '',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;

    if (prevState.imageName !== imageName || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const images = await fetchImages(imageName, page);

        if (images.length === 0) {
          this.setState(prevState => (prevState.images = []));

          toast.error(
            `no picture with name ${imageName}, check what you enter`
          );
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
        }));
      } catch (error) {
        toast.error('sorry image not found');
      } finally {
      }
    }
    if (prevState.page !== page) {
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  closeModal = () => {
    this.setState({ largeImageURL: '' });
  };
  formSubmit = imageName => {
    this.setState({ imageName, page: 1, images: [] });
  };

  selectedImage = (largeImageURL, imgTags) => {
    this.setState({ largeImageURL, imgTags });
  };

  render() {
    const { imageName, status, images, error, largeImageURL, imgTags } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.formSubmit} />
        {error && toast.error('sorry, try again')}
        {status === 'pending' && (
          <div className={css.loading}>
            <Loader />
          </div>
        )}

        {!imageName && (
          <p className={css.looking}>What do you want to find? </p>
        )}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} selectedImage={this.selectedImage} />
            {status === 'resolved' && <Button loadMore={this.loadMore} />}
          </>
        )}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            imgTags={imgTags}
            onClose={this.closeModal}
          >
            <img src={largeImageURL} alt={imgTags} />
          </Modal>
        )}
        <Toaster />
      </div>
    );
  }
}

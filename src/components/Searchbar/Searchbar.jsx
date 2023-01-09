import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const onHendleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      toast.error('Please, enter the name of the image or photo', {
        style: {
          background: 'grey',
          color: '#fff',
        },
      });
      return;
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onHendleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>
            <BsSearch />
          </span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          name="imageName"
          value={imageName}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
      <Toaster />
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  imageName: PropTypes.string,
};

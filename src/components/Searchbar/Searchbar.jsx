import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';

const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const onHendleSubmit = event => {
    event.preventDefault();
    onSubmit(imageName);
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
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  imageName: PropTypes.string,
};
export default Searchbar;

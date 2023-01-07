import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
class Searchbar extends Component {
  state = {
    imageName: '',
  };
  nameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };
  onSubmit = event => {
    event.preventDefault();
    if (this.state.imageName.trim() === '') {
      toast('Please, enter the name of the image or photo', {
        style: {
          background: 'grey',
          color: '#fff',
        },
      });
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.reset();
  };
  reset = () => {
    return this.setState({ imageName: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>
              <BsSearch />
            </span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            value={this.state.imageName}
            onChange={this.nameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
        <Toaster />
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  imageName: PropTypes.string,
};

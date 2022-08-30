import React from 'react';
import Header from '../components/Header';
import '../styles/App.css';

class Search extends React.Component {
  state = {
    inputSearch: '',
    buttonDisabled: true,
  };

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    const numberMagic = 2;

    this.setState({
      [name]: value,
    });

    if (value.length >= numberMagic) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  };

  render() {
    const { inputSearch, buttonDisabled } = this.state;
    return (
      <div className="teste " data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="inputSearch"
            data-testid="search-artist-input"
            value={ inputSearch }
            onChange={ this.handleOnChange }
          />
        </form>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonDisabled }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;

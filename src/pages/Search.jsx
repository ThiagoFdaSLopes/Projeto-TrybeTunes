import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import '../styles/App.css';

class Search extends React.Component {
  state = {
    inputSearch: '',
    buttonDisabled: true,
    lista: [],
    carregando: false,
    nameRecuperado: '',
    exibir: false,
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

  handleOnClick = async () => {
    const { inputSearch } = this.state;
    const name = inputSearch;
    this.setState({
      inputSearch: '',
      carregando: true,
      buttonDisabled: true,
    });

    const albums = await searchAlbumsAPI(name);

    this.setState({
      lista: albums,
      carregando: false,
      exibir: true,
      nameRecuperado: name,
    });
  };

  render() {
    const {
      inputSearch,
      buttonDisabled, lista, carregando, exibir, nameRecuperado } = this.state;
    return (
      <div className="teste " data-testid="page-search">
        <Header />
        { carregando
          ? <Carregando />
          : (
            <>
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
                onClick={ this.handleOnClick }
              >
                Pesquisar

              </button>

            </>)}
        { exibir
        && (
          <h1>
            Resultado de álbuns de:
            {' '}
            {`${nameRecuperado}`}
          </h1>)}

        { lista.length === 0
          ? <h1>Nenhum álbum foi encontrado</h1>
          : (
            <div>
              <ul>
                { lista.map((e) => (
                  <li key={ e.id }>
                    <img src={ e.artworkUrl100 } alt="" />
                    <p>{e.artistName}</p>
                    <p>{e.collectionName}</p>
                    <Link
                      to={ `/album/${e.collectionId}` }
                      data-testid={ `link-to-album-${e.collectionId}` }
                    />
                  </li>)) }
              </ul>
            </div>)}
      </div>
    );
  }
}

export default Search;

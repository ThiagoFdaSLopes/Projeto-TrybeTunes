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
      <>
        {carregando
          ? <Carregando />
          : (
            <Header />)}
        <div
          className="teste container-fluid"
          data-testid="page-search"
        >
          { carregando
            ? <Carregando />
            : (
              <div
                className="teste container-fluid d-flex justify-content-center"
              >
                <form>
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      name="inputSearch"
                      className="form-control me-2"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                      data-testid="search-artist-input"
                      value={ inputSearch }
                      onChange={ this.handleOnChange }
                    />
                  </div>
                </form>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-testid="search-artist-button"
                  disabled={ buttonDisabled }
                  onClick={ this.handleOnClick }
                >
                  Pesquisar
                </button>
              </div>)}
          { exibir
        && (
          <div className="teste container-fluid d-flex justify-content-center">
            <h1>
              Resultado de álbuns de:
              {' '}
              {`${nameRecuperado}`}
            </h1>
          </div>)}
          { lista.length === 0
            && (
              <div className="container-fluid d-flex justify-content-center">
                <h1>Nenhum álbum foi encontrado</h1>
              </div>)}
        </div>
        <div
          className="main
          album py-5 d-flex align-content-start flex-wrap justify-content-center"
        >
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              { lista.map((e) => (
                <div className="col" key={ e.collectionId }>
                  <div className="card shadow-sm">
                    <img
                      src={ e.artworkUrl100 }
                      alt=""
                    />
                    <div className="card-body">
                      <div className="card-text">
                        <p>{e.artistName}</p>
                        <p>{e.collectionName}</p>
                      </div>
                      <Link
                        to={ `/album/${e.collectionId}` }
                        data-testid={ `link-to-album-${e.collectionId}` }
                      >
                        Abrir Album

                      </Link>
                    </div>
                  </div>
                </div>)) }
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Search;

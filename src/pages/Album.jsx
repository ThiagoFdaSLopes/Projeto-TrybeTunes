import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musicas: [],
    favoritada: [],
    carregando: false,
  };

  async componentDidMount() {
    await this.favoritar();
    const { match: { params: { id } } } = this.props;

    const listaM = await getMusics(id);

    this.setState({
      musicas: listaM,
    });
  }

  criandoFavoritas = async (e) => {
    // Preciso atualizar o array com a musica removida de favoritas
    const { favoritada } = this.state;
    const newMusicas = favoritada.some((e2) => e2.trackName === e.trackName);
    if (newMusicas) {
      this.setState({ carregando: true }, async () => {
        await removeSong(e);
        await this.favoritar();
        this.setState({ carregando: false });
      });
    } else {
      this.setState({ carregando: true }, async () => {
        await addSong(e);
        await this.favoritar();
        this.setState({ carregando: false });
      });
    }
  };

  favoritar = async () => {
    const checked = await getFavoriteSongs();
    this.setState(({
      favoritada: checked,
    }));
  };

  render() {
    const { musicas, favoritada, carregando } = this.state;
    return (
      <>
        <Header />
        <div data-testid="container d-flex">
          { musicas.length > 0
        && (
          <div className="album d-flex justify-content-center align-items-center">
            <div className="card mb-5 mt-5">
              <img
                className="card-img-top"
                src={ musicas[0].artworkUrl100 }
                alt={ musicas[0].collectionName }
              />
              <div className="card-body">
                <p
                  className="card-title"
                  data-testid="artist-name"
                >
                  {musicas[0].artistName}

                </p>
                <p
                  className="card-text"
                  data-testid="album-name"
                >
                  {musicas[0].collectionName}

                </p>
              </div>
            </div>
          </div>)}
          <div className="d-flex align-content-start flex-wrap justify-content-center">
            { carregando ? <Carregando /> : musicas.map((e, index) => (index > 0 && (
              <div className="card me-3 mb-3 mt-3" key={ e.trackId }>
                <div className="view">
                  <img className="card-img-top" src={ e.artworkUrl100 } alt="Artista" />
                  <div className="mask gradient-card" />
                </div>
                <div className="card-body text-center">
                  <h5 className="h5 font-weight-bold">{e.trackName}</h5>
                  <MusicCard
                    image={ e.artworkUrl100 }
                    key={ e.trackNumber }
                    previewUrl={ e.previewUrl }
                  />
                  <label
                    htmlFor={ index }
                  >
                    Favorita
                    <input
                      type="checkbox"
                      id={ index }
                      onClick={ async () => {
                        await this.criandoFavoritas(e);
                        await this.favoritar();
                      } }
                      data-testid={ `checkbox-music-${e.trackId}` }
                      defaultChecked={ favoritada.length > 0 && (
                        favoritada.some((e2) => e2.trackName === e.trackName)
                      ) }
                    />
                  </label>
                </div>
              </div>)))}
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;

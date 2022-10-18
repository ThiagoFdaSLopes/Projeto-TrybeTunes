import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';

class Favorites extends Component {
  state = {
    musicas: [],
    carregando: false,
  };

  async componentDidMount() {
    await this.getMusicasFavoritas();
  }

  removendoFavoritas = async (e) => {
    // Preciso renderizar novaLista
    this.setState({ carregando: true }, async () => {
      await removeSong(e);
      await this.getMusicasFavoritas();
      this.setState({ carregando: false });
    });
  };

  getMusicasFavoritas = async () => {
    const musics = await getFavoriteSongs();
    this.setState({
      musicas: musics,
    });
  };

  render() {
    const { musicas, carregando } = this.state;
    return (
      <div
        className="d-flex align-content-start flex-wrap justify-content-center"
        data-testid="page-favorites"
      >
        <Header />
        {carregando ? <Carregando /> : musicas.map((e, index) => (
          <div className="card me-3 mb-3 mt-3" key={ e.trackId }>
            <div className="view">
              <img className="card-img-top" src={ e.artworkUrl100 } alt="Artista" />
              <div className="mask gradient-card" />
            </div>
            <div className="card-body text-center">
              <h5 className="h5 font-weight-bold">{e.trackName}</h5>
              <MusicCard
                key={ e.trackNumber }
                trackName={ e.trackName }
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
                    await this.removendoFavoritas(e);
                  } }
                  data-testid={ `checkbox-music-${e.trackId}` }
                  defaultChecked={ musicas.length > 0 && (
                    musicas.some((e2) => e2.trackName === e.trackName)
                  ) }
                />
              </label>
            </div>
          </div>))}
      </div>
    );
  }
}

export default Favorites;

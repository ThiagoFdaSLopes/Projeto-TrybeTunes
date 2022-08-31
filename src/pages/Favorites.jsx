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
      <div>
        <Header />
        {carregando ? <Carregando /> : musicas.map((e, index) => (
          <div key={ e.trackId }>
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
          </div>))}
      </div>
    );
  }
}

export default Favorites;

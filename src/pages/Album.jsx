import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    this.setState({ carregando: true }, async () => {
      await addSong(e);
      await this.favoritar();
      this.setState({ carregando: false });
    });
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
      <div data-testid="page-album">
        <Header />
        { musicas.length > 0
          ? (
            <div>
              <img src={ musicas[0].artworkUrl60 } alt={ musicas[0].collectionName } />
              <p data-testid="artist-name">{musicas[0].artistName}</p>
              <p data-testid="album-name">{musicas[0].collectionName}</p>
            </div>)
          : <h1>Musicas não encontrada</h1>}
        <div>
          { carregando ? <Carregando /> : musicas.map((e, index) => (index > 0 && (
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
                    await this.criandoFavoritas(e);
                    await this.favoritar();
                  } }
                  data-testid={ `checkbox-music-${e.trackId}` }
                  defaultChecked={ favoritada.length > 0 && (
                    favoritada.some((e2) => e2.trackName === e.trackName)
                  ) }
                />
              </label>
            </div>)))}
        </div>
      </div>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musicas: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const listaM = await getMusics(id);

    this.setState({
      musicas: listaM,
    });
  }

  render() {
    const { musicas } = this.state;
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
          { musicas.map((e, index) => (index > 0 && (
            <MusicCard
              key={ e.trackNumber }
              trackName={ e.trackName }
              previewUrl={ e.previewUrl }
            />)))}
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

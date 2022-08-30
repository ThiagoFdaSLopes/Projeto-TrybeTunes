import React, { Component } from 'react';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';

class Album extends Component {
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicas = getMusics(id);
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropType.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;

import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';
import '../styles/App.css';

export default class Header extends Component {
  state = {
    user: '',
    carregando: true,
  };

  async componentDidMount() {
    const name = await getUser();

    this.setState({
      carregando: false,
      user: name,
    });
  }

  render() {
    const { carregando, user: { name } } = this.state;
    return (
      <header className="cabecalho" data-testid="header-component">
        { carregando ? <Carregando /> : <h1 data-testid="header-user-name">{name}</h1>}
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

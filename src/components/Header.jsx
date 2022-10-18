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
    const { carregando, user: { name, image } } = this.state;
    return (
      <>
        {}
        <header
          className="cabecalho"
          data-testid="header-component"
        >
          { carregando
            ? <Carregando />
            : (
              <div className="titulo-header">
                <h1 className="animate__animated animate__fadeInLeft">Trybe</h1>
                <h2 className="animate__animated animate__fadeInRight">Tunes</h2>
              </div>)}
          { carregando
            ? <Carregando />
            : (
              <div className="links">
                <Link
                  className="links-dire"
                  to="/search"
                  data-testid="link-to-search"
                >
                  Pesquisa

                </Link>
                <Link
                  className="links-dire"
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  Favoritos

                </Link>
                <Link
                  className="links-dire"
                  to="/profile"
                  data-testid="link-to-profile"
                >
                  Profile

                </Link>
              </div>)}
          { carregando
            ? <Carregando />
            : (
              <div className="user">
                <img src={ image } alt="user" />
                <h1 data-testid="header-user-name">{name}</h1>
              </div>
            )}
        </header>
      </>
    );
  }
}

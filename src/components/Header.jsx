import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        { carregando ? <Carregando /> : <h1 data-testid="header-user-name">{name}</h1>}
      </header>
    );
  }
}

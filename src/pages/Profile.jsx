import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends Component {
  state = {
    infoUser: {},
    carregando: false,
  };

  async componentDidMount() {
    await this.infoUsers();
  }

  infoUsers = async () => {
    this.setState({
      carregando: true,
    });
    const user = await getUser();
    this.setState({
      infoUser: user,
      carregando: false,
    });
  };

  render() {
    const { infoUser: { name, email, image, description }, carregando } = this.state;
    return (
      <>
        <Header />
        {carregando ? <Carregando />
          : (
            <div data-testid="page-profile">
              <div>
                <img data-testid="profile-image" src={ image } alt={ name } />
                <h3>Nome</h3>
                <h5>{name}</h5>
                <h3>E-mail</h3>
                <h5>{email}</h5>
                <h3>Descrição</h3>
                <h5>{description}</h5>
              </div>
              <div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            </div>)}
      </>
    );
  }
}

export default Profile;

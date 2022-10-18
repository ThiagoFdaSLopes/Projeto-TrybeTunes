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
            <div
              className="d-flex justify-content-center flex-direction-column"
              data-testid="page-profile"
            >
              <div
                className="card heigth-card mt-2"
              >
                <div className="div-image">
                  <img
                    className="img-perfil"
                    data-testid="profile-image"
                    src={ image }
                    alt={ name }
                  />
                  <div className="mask gradient-card" />
                </div>
                <div className="card-body text-center">
                  <p>Nome</p>
                  <h5 className="my-3">{name}</h5>
                  <p>E-mail</p>
                  <h5 className="text-muted mb-1">{email}</h5>
                  <p>Descrição</p>
                  <h5 className="text-muted mb-1">{description}</h5>
                  <Link
                    className="btn btn-outline-primary ms-1 mt-2"
                    to="/profile/edit"
                  >
                    Editar perfil

                  </Link>
                </div>
              </div>
            </div>)}
      </>
    );
  }
}

export default Profile;

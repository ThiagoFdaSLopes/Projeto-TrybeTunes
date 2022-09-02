import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    goTO: false,
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
      name: user.name,
      image: user.image,
      description: user.description,
      email: user.email,
      carregando: false,
      buttonDisabled: true,
    }, this.checkLoadInputs);
  };

  checkLoadInputs = () => {
    const { name, image, description, email } = this.state;
    if (email && image && name && description) {
      this.setState({
        buttonDisabled: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    // Manda a infos digitadas pelo usuario e mandar para o infoUser e chamar info user dentro do setState

    this.setState({
      [name]: value,
    }, () => {
      const { email, image, description } = this.state;
      const emailVali = this.isValidEmail(email);
      if (emailVali && image && name && description) {
        this.setState({
          buttonDisabled: false,
        });
      } else {
        this.setState({
          buttonDisabled: true,
        });
      }
    });
  };

  atualizarUser = async (obj) => {
    this.setState({
      carregando: true,
    });
    await updateUser(obj);

    this.setState({
      goTO: true,
    });
  };

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  render() {
    const { name, image, email,
      description, carregando, buttonDisabled, goTO } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {carregando
          ? <Carregando />
          : (
            <form>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  name="name"
                  data-testid="edit-input-name"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                E-mail:
                <input
                  type="text"
                  name="email"
                  data-testid="edit-input-email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="image">
                Imagem:
                <input
                  type="text"
                  name="image"
                  value={ image }
                  data-testid="edit-input-image"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ buttonDisabled }
                onClick={ () => this.atualizarUser({ name, image, description, email }) }
              >
                Salvar
              </button>
            </form>)}
        { goTO && <Redirect to="/profile" />}
      </div>
    );
  }
}

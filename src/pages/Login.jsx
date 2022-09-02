import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../styles/App.css';
import 'animate.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      redirect: false,
      buttonDisabled: true,
    };
  }

  handleInputName = ({ target }) => {
    const { name, value } = target;
    const numberMagic = 3;

    this.setState({
      [name]: value,
    });

    if (value.length >= numberMagic) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  };

  handleOnClick = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });

    await createUser({ name });

    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { name, buttonDisabled, loading, redirect } = this.state;
    return (
      <div className="div-name" data-testid="page-login">
        { loading
          ? <Carregando />
          : (
            <div className="image">
              <h1 className="animate__animated animate__fadeInLeft">Trybe</h1>
              <h2 className="animate__animated animate__fadeInRight">Tunes</h2>
            </div>)}
        <form>
          <label htmlFor="name">
            <div className="div-input">
              <p className="p-login animate__animated animate__fadeIn">Login:</p>
              <input
                className="input-name"
                data-testid="login-name-input"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleInputName }
              />
            </div>
          </label>
        </form>
        <button
          className="button-85"
          type="button"
          data-testid="login-submit-button"
          disabled={ buttonDisabled }
          onClick={ this.handleOnClick }
        >
          Entrar

        </button>
        { redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;

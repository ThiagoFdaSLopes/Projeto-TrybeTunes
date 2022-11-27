import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import Carregando from "./Carregando";
import { getUser, updateUser } from "../services/userAPI";

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
    this.setState(
      {
        name: user.name,
        image: user.image,
        description: user.description,
        email: user.email,
        carregando: false,
        buttonDisabled: true,
      },
      this.checkLoadInputs
    );
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

    this.setState(
      {
        [name]: value,
      },
      () => {
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
      }
    );
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
    const {
      name,
      image,
      email,
      description,
      carregando,
      buttonDisabled,
      goTO,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {carregando ? (
          <Carregando />
        ) : (
          <div className="d-flex justify-content-center">
            <div className="col-md-4 mt-5 bg-light rounded">
              <form id="form-box" className="p-2">
                <div className="form-group input-group mt-2">
                  <div className="input-group-prepend" />
                  <span className="input-group-text">
                    <i className="bi bi-person-check-fill" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    data-testid="edit-input-name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group input-group mt-2">
                  <div className="input-group-prepend" />
                  <span className="input-group-text">
                    <i className="bi bi-envelope" />
                  </span>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    data-testid="edit-input-email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group input-group mt-2">
                  <div className="input-group-prepend" />
                  <span className="input-group-text">
                    <i className="bi bi-type" />
                  </span>
                  <textarea
                    name="description"
                    cols="30"
                    rows="4"
                    className="form-control"
                    data-testid="edit-input-description"
                    value={description}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group input-group mt-2">
                  <div className="input-group-prepend" />
                  <span className="input-group-text">
                    <i className="bi bi-person-bounding-box" />
                  </span>
                  <input
                    type="text"
                    name="image"
                    value={image}
                    className="form-control"
                    data-testid="edit-input-image"
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  data-testid="edit-button-save"
                  type="button"
                  className="btn btn-primary btn-block mt-2"
                  disabled={buttonDisabled}
                  onClick={() =>
                    this.atualizarUser({ name, image, description, email })
                  }
                >
                  Salvar
                </button>
              </form>
            </div>
          </div>
        )}
        {goTO && <Redirect to="/profile" />}
      </div>
    );
  }
}

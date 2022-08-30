import '../styles/Login.css';

function Login() {
  return (
    <div className="div-name" data-testid="page-login">
      <div className="image">
        <img src="sound.png" alt="login imagem" />
      </div>
      <form>
        <label htmlFor="name">
          <div className="div-input">
            <p className="p-login">Login:</p>
            <input className="input-name" type="text" name="name" />
          </div>
        </label>
      </form>
      <button
        type="button"
        data-testid="login-submit-button"
        onClick={ teste }
      >
        Entrar

      </button>
    </div>
  );
}

export default Login;

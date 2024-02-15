import "./Login.css";

function Login() {
  return (
    <>
      <div className="login">
        <div className="loginForm">
          <a href="/">
            <img src="SAlogodark.png" alt="Logo" width="90%" />
          </a>
          <form>
            <div>
              <input
                type="text"
                id="username"
                placeholder="Enter Your Email"
                name="username"
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                name="password"
              />
              <p className="terms-text">
                Forgot your <a href="/">email</a> or <a href="/">password?</a>
              </p>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <p className="terms-text">
              New to ScrapAway? <a href="/">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

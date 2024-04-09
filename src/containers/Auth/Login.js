import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  // ham tao
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
    };
  }
  handleInputChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };
  handleLogin = () => {
    console.log(this.state.username, this.state.password);
    console.log("all state: ", this.state);
  };
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  render() {
    return (
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name / Email"
                  name="username"
                  value={this.state.username}
                  onChange={(e) => this.handleInputChange(e, "username")}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  className="login__input"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleInputChange(e, "password")}
                />
                <span
                  type="button"
                  className="toggle-password"
                  onClick={this.togglePasswordVisibility}
                >
                  {this.state.showPassword ? (
                    <i className="far fa-eye"></i>
                  ) : (
                    <i class="far fa-eye-slash"></i>
                  )}
                </span>
              </div>
              <button
                className="button login__submit"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <div>
                <span>Forgot your password?</span>
              </div>
            </form>
            <div className="social-login">
              <h3>log in</h3>
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram"></a>
                <a href="#" className="social-login__icon fab fa-facebook"></a>
                <a href="#" className="social-login__icon fab fa-twitter"></a>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

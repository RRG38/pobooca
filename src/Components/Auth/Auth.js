import "./Auth.css";

import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { updateUser } from "../../redux/reducer";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      school: '',
      errorMsg: "",
    };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }
  handleChange(prop, val) {
    this.setState({
      [prop]: val,
    });
  }
  login() {
    axios
      .post("/api/auth/login", this.state)
      .then(({data}) => {
        const { username, school } = data
        this.props.updateUser({ username, school });
        this.props.history.push("/dash");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ errorMsg: "Incorrect username or password!" });
      });
  }
  register() {
    axios
      .post("/api/auth/register", this.state)
      .then(({data}) => {
        const { username, school } = data
        this.props.updateUser({ username, school });
        this.props.history.push("/dash");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ errorMsg: "Username taken!" });
      });
  }
  closeErrorMessage = () => {
    this.setState({
      errorMsg: false,
      username: "",
      password: "",
      school: ''
    });
  };
  render() {
    return (
      <div className="auth-parent">
        <div className='auth-header'>
          Pobooca.app
        </div>
        <div className='section-parent'>
          <div>
          A web app for post-bootcamp students.
        </div>
        </div>
        <div className='register-container'>
          {this.state.errorMsg && (
            <h3 className="auth-error-msg">
              {this.state.errorMsg}{" "}
              <span onClick={this.closeErrorMessage}>X</span>
            </h3>
          )}
          <div className='auth-description'> Continue to learn as we interview and find jobs.</div>
          <div className='auth-free'> Want a free account? </div>

          <input className="auth-input"
            value={this.state.school}
          placeholder="Bootcamp Attended *Only Required at Register*"
            onChange={(e) => this.handleChange("school", e.target.value)}
          />
            <input className="auth-input"
              value={this.state.username} placeholder="Username"
              onChange={(e) => this.handleChange("username", e.target.value)}
            />
            <input className="auth-input"
              value={this.state.password}
              type="password"
              placeholder="Password"
              onChange={(e) => this.handleChange("password", e.target.value)}
            />
          <div className="auth-button-container">
            <button className="dark-button" onClick={this.login}>
              {" "}
              Login{" "}
            </button>
            <button className="dark-button" onClick={this.register}>
              {" "}
              Register{" "}
            </button>
          </div>
        </div>
      </div>
      )
  }
}
export default connect(null, { updateUser })(Auth);
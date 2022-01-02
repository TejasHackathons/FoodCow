import React, { Component } from "react";
import axios from "axios";
import "./navBar.scss";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    axios.get("/account/isLoggedIn").then((res) => {
      this.setState({ isLoggedIn: res.data.msg });
    });
  }
  render() {
    return (
      <div className="navBar">
        <nav>
          <ul>
            <li>
              <a className={"homeIcon"} href="/">
                🐄
              </a>
              <a
                className={this.state.isLoggedIn ? "startRecording" : "signUp"}
                href={this.state.isLoggedIn ? "/record" : "/signup"}
              >
                {this.state.isLoggedIn ? "Start Recording" : "Sign Up"}
              </a>
            </li>
            <li>
              <a href={this.state.isLoggedIn ? "/account" : "/login"}>
                {this.state.isLoggedIn ? "My Account" : "Log In"}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;

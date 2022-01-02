import React, { Component } from "react";
import { TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import "./logIn.scss";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
      error: false,
    };
  }
  render() {
    return (
      <div className="loginContainer">
        <h1 className="logInHeader">Log In</h1>
        {this.state.error ? (
          <Alert severity="error">{this.state.error}</Alert>
        ) : (
          <></>
        )}
        <TextField
          className="textField"
          variant="filled"
          placeholder="Phone Number"
          value={this.state.phoneNumber}
          required
          onChange={(evt) => {
            this.setState({ phoneNumber: evt.target.value });
          }}
        />

        <TextField
          className="textField"
          variant="filled"
          type="password"
          placeholder="Password"
          value={this.state.password}
          required
          onChange={(evt) => {
            this.setState({ password: evt.target.value });
          }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            if (!this.state.phoneNumber == "" && !this.state.password == "") {
              axios
                .post("/account/login", {
                  phoneNumber: this.state.phoneNumber,
                  password: this.state.password,
                  
                })
                .then((res) => {
                  this.setState({
                    error: false,
                  });
                  window.open("/account", "_self");
                })
                .catch((err) => {
                  this.setState({
                    error: err.response.data
                  });
                });
            }
          }}
        >
          Log In
        </Button>
      </div>
    );
  }
}

export default LogIn;

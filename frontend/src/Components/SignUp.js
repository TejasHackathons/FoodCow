import React, { Component } from "react";
import { TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import "./signUp.scss";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
      error: false,
      success: false,
    };
  }
  render() {
    return (
      <div className="signUpContainer">
        <h1 className="signUpHeader">Sign Up</h1>
        {this.state.error ? (
          <Alert severity="error">{this.state.error}</Alert>
        ) : (
          <></>
        )}
        {this.state.success ? (
          <Alert severity="success">{this.state.success}</Alert>
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
          onChange={(evt) => this.setState({ password: evt.target.value })}
        />
        <Button
          variant="outlined"
          onClick={() => {
            if (!this.state.phoneNumber == "" || this.state.password == "") {
              axios
                .post("/account/signup", {
                  phoneNumber: this.state.phoneNumber,
                  password: this.state.password,
                })
                .then((res) => {
                  this.setState({
                    error: false,
                    success: res.data,
                  });
                })
                .catch((err) => {
                  this.setState({
                    error: err.response.data,
                    success: false,
                  });
                });
            }
          }}
        >
          Sign Up
        </Button>
      </div>
    );
  }
}

export default SignUp;

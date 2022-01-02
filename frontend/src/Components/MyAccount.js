import axios from "axios";
import React, { Component } from "react";
import "./myAccount.scss";
import { Button } from "@mui/material";
import moment from "moment";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      ranking: 0,
      total: 0,
    };
  }
  componentDidMount() {
    axios.get("/account/userPoints").then((res) => {
      this.setState({ points: res.data.msg });
    });
    axios.get("/account/pointsRanking").then((res) => {
      this.setState({ ranking: res.data.ranking, total: res.data.total });
    });
  }
  render() {
    return (
      <div className="myAccountContainer">
        <h1 className="myAccountText">My Account</h1>
        <h1>Giveaway Points: {this.state.points}</h1>
        <p>
          You are currently ranked #{this.state.ranking} out of{" "}
          {this.state.total}
        </p>
        <p>
          There are {moment().endOf("month").diff(moment(), "days")} days left
          until the monthly giveaway.
        </p>
        <br />
        <Button
          className="logoutButton"
          variant="contained"
          onClick={() => {
            axios
              .post("/account/logout")
              .then(() => window.open("/login", "_self"));
          }}
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default MyAccount;

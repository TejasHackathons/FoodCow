import React from "react";
import cow from "../img/cow.png";
import "./home.scss";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="cowTitle">Food Cow 🐄</h1>
        <h4 className="cowText">
          This is <h4 className="mooText">Moo</h4> the cow. <br />
          <h4 className="mooText">Moo's</h4> going to help you eat{" "}
          <h4 className="healthierText">healthier </h4>
          this <h4 className="newYearText">New Year 🎆</h4>{" "}
        </h4>
        <img className="cowImg" src={cow} alt="Cow" />
      </header>
    </div>
  );
}

export default Home;

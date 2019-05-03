import React, { Component } from "react";
import "./App.css";
import LandingPage from "./components/landingPage";
import { Route } from "react-router-dom";
import ContactPage from "./components/contacts";

class App extends Component {
  render() {
    return (
      <div>
        <main>
          <Route exact path="/" component={LandingPage} />
          <Route path="/contacts" component={ContactPage} />
        </main>
      </div>
    );
  }
}

export default App;

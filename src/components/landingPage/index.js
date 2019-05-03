import React, { Component } from "react";
import "./styles.css";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing_container">
        <section className="landing_section">
          <h1>An easy way to manage your contacts</h1>
          <span>access your contacts anywhere you go</span>
          <br />
          <a className="landing_link" href="/contacts">
            Click to view your contacts
          </a>
        </section>
      </div>
    );
  }
}

export default LandingPage;

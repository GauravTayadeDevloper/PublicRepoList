import React, { Component } from "react";

class Header extends Component {
  render() {
    const head = {
      backgroundColor: "#99775C",
      width: "100%",
      height: "5%",
    };

    return (
      <div style={head}>
        <center>
          <h1>GIT REPOSITORIES</h1>
        </center>
      </div>
    );
  }
}

export default Header;

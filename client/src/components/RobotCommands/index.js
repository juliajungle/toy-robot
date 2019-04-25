import React, { Component } from "react";
import "./index.css";

class CommandsList extends Component {
  render() {
    return (
      <div className="robot-commands">
        <h2 className="commands-title">commands:</h2>
        <ul className="commands-list">
          <li className="commands-list__item">move</li>
          <li className="commands-list__item">left</li>
          <li className="commands-list__item">right</li>
        </ul>
      </div>
    );
  }
}

export default CommandsList;

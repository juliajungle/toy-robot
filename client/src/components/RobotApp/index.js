import React, { Component } from "react";
import RobotTable from "../RobotTable";
import RobotCommands from "../RobotCommands";
import "./index.css";

class RobotApp extends Component {
  state = {
    data: null,
    interval: null
  };

  componentDidMount() {
    this.getData();
    if (!this.state.interval) {
      const interval = setInterval(this.getData, 1000);
      this.setState({ interval });
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    if (interval) {
      clearInterval(interval);
      this.setState({ interval: null });
    }
  }

  getData = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(result => this.setState({ data: result.data }))
      .catch(error => {
        console.error("Error:", error);
        // if there API is down stop poll
        clearInterval(this.state.interval);
      });
  };

  // TODO: add loading gif
  render() {
    return (
      <div className="robot-app">
        <header className="robot-app__header">
          <h1>Robot Challenge</h1>
          <RobotCommands />
        </header>

        {this.state.data && <RobotTable position={this.state.data} />}
      </div>
    );
  }
}

export default RobotApp;

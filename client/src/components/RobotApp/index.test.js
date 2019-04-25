import React from "react";
import ReactDOM from "react-dom";
import RobotApp from "./RobotApp";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RobotApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React, { Component } from "react";
import { mapper } from "../../utils";
import "./index.css";

class RobotTable extends Component {
  state = {
    xPosition: 0,
    yPosition: 0,
    facingDirection: "NORTH"
  };

  drawGrid = context => {
    context.beginPath();
    context.moveTo(180, 0);
    context.lineTo(0, 500);
    context.lineTo(170, 500);
    context.lineTo(270, 0);
    context.lineWidth = 5;
    context.strokeStyle = "#7704bf";
    context.stroke();

    context.beginPath();
    context.moveTo(360, 0);
    context.lineTo(340, 500);
    context.lineTo(510, 500);
    context.lineTo(450, 0);
    context.strokeStyle = "#7704bf";
    context.stroke();

    context.beginPath();
    context.moveTo(540, 0);
    context.lineTo(680, 500);
    context.lineTo(850, 500);
    context.lineTo(630, 0);
    context.strokeStyle = "#7704bf";
    context.stroke();

    context.beginPath();
    context.moveTo(180, 0);
    context.lineTo(630, 0);
    context.lineTo(675, 100);
    context.lineTo(145, 100);
    context.strokeStyle = "#7704bf";
    context.stroke();

    context.beginPath();
    context.moveTo(108, 200);
    context.lineTo(718, 200);
    context.lineTo(762, 300);
    context.lineTo(70, 300);
    context.strokeStyle = "#7704bf";
    context.stroke();

    context.beginPath();
    context.moveTo(35, 400);
    context.lineTo(806, 400);
    context.lineTo(852, 500);
    context.lineTo(0, 500);
    context.strokeStyle = "#7704bf";
    context.stroke();
  };

  getRobotImage = facing => {
    switch (facing) {
      case "NORTH":
        return this.refs.imageback;
      case "SOUTH":
        return this.refs.image;
      case "EAST":
        return this.refs.imageright;
      case "WEST":
        return this.refs.imageleft;
      default:
        return this.refs.imageback;
    }
  };

  getRobotSize = y => {
    const sizeMapper = {
      "0": {
        width: 50,
        height: 100
      },
      "1": {
        width: 45,
        height: 90
      },
      "2": {
        width: 40,
        height: 80
      },
      "3": {
        width: 35,
        height: 70
      },
      "4": {
        width: 30,
        height: 60
      }
    };

    return sizeMapper[y];
  };

  drawRobot = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const { facingDirection, yPosition } = this.state;
    const { width, height } = this.getRobotSize(yPosition);
    console.log(width, height);
    const img = this.getRobotImage(facingDirection);
    const { x, y } = mapper(this.state);
    console.log(img, x, y);
    ctx.clearRect(0, 0, 900, 500);
    this.drawGrid(ctx);

    ctx.drawImage(img, x, y, width, height);
  };

  componentDidMount() {
    console.log("mount", this.state);
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    this.drawGrid(ctx);
    this.drawRobot();
  }

  componentDidUpdate() {
    const { xPosition, yPosition, facingDirection } = this.state;
    const { x, y, facing } = this.props.position;
    console.log("componentDidUpdate", facing);

    if (x !== xPosition || y !== yPosition || facing !== facingDirection) {
      this.setState(
        {
          xPosition: x,
          yPosition: y,
          facingDirection: facing
        },
        () => {
          this.drawRobot();
        }
      );
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={900} height={500} />
        <img ref="image" src="robot.png" className="hidden" />
        <img ref="imageback" src="robot-backward.png" className="hidden" />
        <img ref="imageleft" src="robot-left.png" className="hidden" />
        <img ref="imageright" src="robot-right.png" className="hidden" />
      </div>
    );
  }
}
export default RobotTable;

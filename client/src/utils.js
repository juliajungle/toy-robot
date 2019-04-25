const getX = (positionX, positionY) => {
  if (positionY > 2) {
    switch (positionX) {
      case "0":
        return 180;
      case "1":
        return 280;
      case "2":
        return 390;
      case "3":
        return 500;
      case "4":
        return 600;
      default:
        return 0;
    }
  } else {
    switch (positionX) {
      case "0":
        return 90;
      case "1":
        return 260;
      case "2":
        return 370;
      case "3":
        return 540;
      case "4":
        return 680;
      default:
        return 0;
    }
  }
};

const getY = positionY => {
  switch (positionY) {
    case "0":
      return 390;
    case "1":
      return 300;
    case "2":
      return 210;
    case "3":
      return 110;
    case "4":
      return 10;
    default:
      return 0;
  }
};

export const mapper = ({ xPosition, yPosition }) => {
  return { x: getX(xPosition, yPosition), y: getY(yPosition) };
};

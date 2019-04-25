const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const {move, left, right} = require('./commands');
const {getCurrentPosition, addMove} = require('./model');

let currentPosition;

const askQuestions = () => {
  const questions = [
    {
      name: "MOVE",
      type: "input",
      message: ">"
    },
  ];
  return inquirer.prompt(questions);
};

const isInputValid = (input) => {
  // TODO: make regex
  const validCommands = ['move', 'left', 'right'];
  return validCommands.find((item) => item.indexOf(input.toLowerCase()) >= 0);
}

const init = async () => {
  currentPosition = await getCurrentPosition();

    console.log(
      chalk.green(
        figlet.textSync("ROBOT", {
          font: "alligator",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    );
    
  run();
}

const doCommand = async (command) => {
  let positionObject
  switch (command){
    case 'move':
      positionObject = move(currentPosition);
      break;
    case 'left':
      positionObject = left(currentPosition);
      break;
    case 'right':
      positionObject = right(currentPosition);
      break;
    default: 
      positionObject = currentPosition;
      break;
  }

  if (positionObject){
    const newPosition = await addMove(positionObject);
    return newPosition;
  } else {
    danger();
  }
}

const success = ({facing, x, y}) => {
  console.log(
    chalk.white.bgGreen.bold(`Current position:  ${x} ${y} ${facing}`)
  );
};

const danger = () => {
  console.log(
    chalk.white.bgRed.bold(`Watch out! That move would make the robot fall!`)
  );
};

const error = move => {
  console.log(
    chalk.white.bgRed.bold(`${move} is an invalid move!`)
  );
};

const run = async () => {
  // ask questions
  const answers = await askQuestions();
  const { MOVE } = answers;
  const isValidCommand = isInputValid(MOVE);

  if (isValidCommand) {
    // create the file
    currentPosition = await doCommand(MOVE) || currentPosition;
    if(currentPosition) {
      // show success message
      success(currentPosition);
    }
    // robot would fall off the table!
    else {
      danger();
    }
  } else {
    error(MOVE);
  }

  run();
};

module.exports= {run, init};
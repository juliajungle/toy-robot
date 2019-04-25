const isValidMove = (x,y) => {
    return x >= 0 && x<= 4 && y >= 0 && y<= 4;
}

// Moves the robot 1 grid unit in the direction it is facing unless that movement will cause the robot to fall off the grid.
const move = (position) =>{
    let {x,y, facing} = position;
    switch (facing){
        case 'NORTH':
            y=++y; 
            break;
        case 'SOUTH':
            y=--y;
            break;
        case 'WEST':
            x=--x;
            break;
        case 'EAST':
            x=++x;
            break;
    }

    return isValidMove(x,y) ? {x,y,facing } : false ;
}

// Rotate the robot 90° anticlockwise/counterclockwise.
const left = (position) => {
    const {x, y, facing} = position;

    switch (facing){
        case 'NORTH':
            return {facing: 'WEST', x, y};
        case 'SOUTH':
            return {facing: 'EAST', x, y};
        case 'WEST':
            return {facing: 'SOUTH', x, y};
        case 'EAST':
            return {facing: 'NORTH', x, y};
    }
}

// // Rotate the robot 90° clockwise.
const right = (position) => {
    const {x, y, facing} = position;

    switch (facing){
        case 'NORTH':
            return {facing: 'EAST', x, y};
        case 'SOUTH':
            return {facing: 'WEST', x, y};
        case 'WEST':
            return {facing: 'NORTH', x, y};
        case 'EAST':
            return {facing: 'SOUTH', x, y};
    }
}

// // Outputs the robot's current grid location and facing direction.
// report()


module.exports = {move, left, right};
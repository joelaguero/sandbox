import React from 'react';
import GameInfo from './GameInfo.jsx';
import GameBoard from './GameBoard.jsx';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerTurn: 1,
      ships: {
        p1: [],
        p2: [],
      },
    };
    this.rules = {
      boardSize: 10,
      numShips: 5,
    }
  }

  componentDidMount() {
    this.startNewGame();
    console.log(this.state);
  }

  startNewGame() {
    this.setState({
      playerTurn: 1,
      ships: {
        p1: [],
        p2: [],
      },
    });
    this.randomlyPlaceShips();
  }

  randomlyPlaceShips() {
    for (let i = 1; i <= this.rules.numShips; i++) {
      this.placeShipOfLength(i, 'p1');
      this.placeShipOfLength(i, 'p2');
    }
  }

  placeShipOfLength(length, owner) {
    let shipPlaced = false;
    while (!shipPlaced) {
      // Choose a random starting point and direction.
      let coords = _randomCoordinatePair(this.rules.boardSize);
      let direction = _randomCardinalDirection();
      let shipCoords = [];

      // Check each potential tile to ensure it is neither occupied already
      // nor out of bounds.
      for (let i = 0; i < length; i++) {
        coords = this.calculateCoords(coords, direction);
        if (this.isOutOfBounds(coords) || this.isOccupied(coords)) { break; } else {
          shipCoords.push(coords);
        }
      }

      // Once the appropriate number of empty and valid coordinates are found,
      // update state accordingly with the ship.
      if (shipCoords.length === length) {
        this.setState({
          owner: this.state.ships[owner].push({
            isSunk: false,
            'coords': shipCoords,
          }),
        });
        shipPlaced = true;
      }
    }
  }

  calculateCoords(coords, direction) {
    let newCoords = _.clone(coords);
    switch(direction) {
      case 'NORTH':
      newCoords.y++; break;
      case 'EAST':
      newCoords.x++; break;
      case 'SOUTH':
      newCoords.y--; break;
      case 'WEST':
      newCoords.x--; break;
      default:
      return newCoords;
    }
    return newCoords;
  }

  isOutOfBounds(coords) {
    return (coords.x < 1 || this.boardSize < coords.x || coords.y < 1 || this.boardSize < coords.y);
  }

  isOccupied(coords) {
    // Iterate over the ships in state and check if any of the ship's coords
    for (let playerNum in this.state.ships) {
      for (let i = 0; i < this.state.ships[playerNum]; i++) {
        let ship = this.state.ships[playerNum][i];
        if (ship.x === coords.x && ship.y === coords.y) { return true; }
      }
    }
    return false;
  }


  render() {
    return (
      <div>
        <GameInfo />
        <GameBoard size={this.boardSize} ships={this.state.ships} />
      </div>
    );
  }
};

const _randomCoordinatePair = (boardSize) => (
  { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize), isHit: false, }
);

const _randomCardinalDirection = () => {
  const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  return directions[Math.floor(Math.random() * 4)];
};

export default App;

import React from 'react';
import GameInfo from './GameInfo.jsx';
import GameBoard from './GameBoard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.rules = {
      boardSize: 10,
      numShips: 5,
    }
  }

  componentDidMount() {
    this.startNewGame();
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
      for (var delta = 0; delta < length; delta++) {
        coords = this.calculateCoords(coords, direction, delta);
        if (this.isOutOfBounds(coords) || this.isOccupied(coords)) { break; } else {
          shipCoords.push(coords);
          delta++;
        }
      }
      // Once the appropriate number of empty and valid coordinates are found,
      // update state accordingly with the ship.
      if (shipCoords.length === length) {
        this.setState({
          owner: this.state.ships.owner.push({
            isSunk: false,
            coords: shipCoords,
          }),
        });
        shipPlaced = true;
      }
    }
  }

  calculateCoords(coords, direction, delta) {
    switch(direction) {
      case 'NORTH':
      coords.y += delta; break;
      case 'EAST':
      coords.x += delta; break;
      case 'SOUTH':
      coords.y -= delta; break;
      case 'WEST':
      coords.x -= delta; break;
      default:
      return coords;
    }
    return coords;
  }

  isOutOfBounds(coords) {
    return !(0 < coords.x && coords.x <= this.boardSize && 0 < coords.y && coords.y <= this.boardSize);
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
  [ Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize) ]
);

const _randomCardinalDirection = () => {
  const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  return directions[Math.floor(Math.random() * 4)];
};

export default App;

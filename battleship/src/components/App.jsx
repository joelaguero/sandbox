import React from 'react';
import GameInfo from './GameInfo.jsx';
import GameBoard from './GameBoard.jsx';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerTurn: 'p1',
      ships: {
        p1: [],
        p2: [],
      },
    };
    this.rules = {
      boardSize: 10,
      numShips: 5,
    }
    this.handleTileClick = this.handleTileClick.bind(this);
  }

  componentDidMount() {
    this.startNewGame();
    console.log(this.state);
    // TODO: Figure out why state is correct here, but not after clicking a tile.
  }

  startNewGame() {
    this.setState({
      playerTurn: 'p1',
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
        coords = (i === 0) ? coords : this.calculateCoords(coords, direction);
        if (this.isOutOfBounds(coords) || this.isOccupied(coords)) { break; } else {
          shipCoords.push(coords);
        }
      }

      // Once the appropriate number of empty and valid coordinates are found,
      // update state accordingly with the ship.
      if (shipCoords.length === length) {
        this.setState({
          // TODO: Confirm that you are updating state correctly here.
          owner: this.state.ships[owner].push({
            isSunk: false,
            'coords': shipCoords,
            'owner': owner,
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
    return (coords.x < 0 || this.boardSize <= coords.x || coords.y < 0 || this.boardSize <= coords.y);
  }

  isOccupied(coords) {
    // Iterate over the ships in state and check if any of the ship's coords match the provided coords.
    for (let playerNum in this.state.ships) {
      for (let i = 0; i < this.state.ships[playerNum]; i++) {
        let ship = this.state.ships[playerNum][i];
        for (let j = 0; j < ship.coords.length; j++) {
          if (ship.coords[j].x === coords.x && ship.coords[j].y === coords.y) { return true; }
        }
      }
    }
    return false;
  }

  handleTileClick(x, y) {
    console.log(this.state);
    const ship = this.findEnemyShipAt(x, y);
    if (ship) {
      // If there is a ship present and it belongs to the opposing player, hit it.
      this.hitShip(ship);
    }
  }

  findEnemyShipAt(x, y) {
    const enemy = this.state.playerTurn === 'p1' ? 'p2' : 'p1';
    for (let i = 0; i < this.state.ships[enemy].length; i++) {
      let ship = this.state.ships[enemy][i];
      for (let j = 0; j < ship.coords.length; j++) {
        console.log(i, j);
        if (ship.coords[j].x === x && ship.coords[j].y === y) {
          console.log(ship); return ship; }
      }
    }
  }

  hitShip(ship) {
    // TODO: Update the isHit property of the ship to true.
    // TODO: Check if the ship is sunk now.
  }

  render() {
    return (
      <div>
        <GameInfo />
        <GameBoard
          size={this.rules.boardSize}
          ships={this.state.ships}
          handleTileClick={this.handleTileClick} />
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

import React from 'react';
import GameInfo from './GameInfo.jsx';
import GameBoard from './GameBoard.jsx';

class App extends React.Component {
  constructor() {
    this.rules = {
      boardSize: 10,
      numShips: 5,
    }
    startNewGame();
  }

  startNewGame() {
    this.setState({
      playerTurn: 1,
      ships: {
        p1: [],
        p2: [],
      },
    });
    randomlyPlaceShips();
  }

  randomlyPlaceShips() {
    for (let i = 1; i <= this.rules.numShips; i++) {
      placeShipOfLength(i, 'p1');
      placeShipOfLength(i, 'p2');
    }
  }

  placeShipOfLength(length, owner) {
    let shipPlaced = false;
    while (!shipPlaced) {
      // Choose a starting point at random and a direction.
      let coords = _randomCoordinatePair(this.rules.boardSize);
      let direction = _randomCardinalDirection();
      let shipCoordinates = [];

      // Check each potential tile to ensure it is not occupied already
      // nor out of bounds.
      for (var delta = 0; delta < length; delta++) {
        coords = calculateCoords(coords, direction, delta);
        if (isOutOfBounds(coords) || isOccupied(coords)) { break; } else {
          shipCoordinates.push(coords);
          delta++;
        }
      }
      // If the appropriate number of empty and valid coordinates are found,
      // update state accordingly with the ship.
      if (shipCoordinates.length === length) {
        this.setState({
          owner: this.state.ships.owner.push({
            isSunk: false,
            coordinates: shipCoordinates,
          });
        })
        shipPlaced = true;
      }
      // Repeat this process until the ship is successfully placed.
    }
  }

  isOccupied(coordinates) {
    // Iterate over the ships in state and check if any of the ship's coordinates
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

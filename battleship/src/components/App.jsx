import React from 'react';
import GameInfo from './GameInfo.jsx';
import GameBoard from './GameBoard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.boardSize = 10;
    startNewGame();
  }

  startNewGame() {
    this.setState({
      playerTurn: 1,
    });
    randomlyPlaceShips();
  }

  randomlyPlaceShips() {
    
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

export default App;

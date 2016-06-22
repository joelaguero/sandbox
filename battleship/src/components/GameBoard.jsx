import React from 'react';

const GameBoard = (props) => {
  let grid = [];
  for (var i = 0; i < props.size; i++) {
    let cols = [];
    for (var j = 0; j < props.size; j++) {
      cols.push(<td/>);
    }
    grid.push(<tr>{cols}</tr>);
  }

  return (
    <table>
      {grid}
    </table>
  );
};

export default GameBoard;

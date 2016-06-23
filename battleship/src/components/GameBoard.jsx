import React from 'react';

const GameBoard = (props) => {
  let grid = [];
  for (let i = 0; i < props.size; i++) {
    let cols = [];
    for (let j = 0; j < props.size; j++) {

        cols.push(<td key={i,j} onClick={() => (props.handleTileClick(i, j))} />);
    }
    grid.push(<tr key={i} >{cols}</tr>);
  }
  return (
    <table>
      <tbody>
        {grid}
      </tbody>
    </table>
  );
};

export default GameBoard;

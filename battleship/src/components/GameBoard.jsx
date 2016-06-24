import React from 'react';

const GameBoard = (props) => {
  let grid = [];
  for (let i = 0; i < props.size; i++) {
    let cols = [];
    for (let j = 0; j < props.size; j++) {
      let owner = props.isHit({ x: i, y: j}, props.ships);
      switch(owner) {
        case 'p1':
          cols.push(<td key={i,j} className="ship p1" onClick={() => (props.handleTileClick(i, j))} />);
          break;
        case 'p2':
          cols.push(<td key={i,j} className="ship p2" onClick={() => (props.handleTileClick(i, j))} />);
          break;
        default: // 'water'
          cols.push(<td key={i,j} className="water" onClick={() => (props.handleTileClick(i, j))} />);
      }
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

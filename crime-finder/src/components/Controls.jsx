import React from 'react';

const Controls = (props) => (
  <div>
    <button id="back-page" onClick={ props.handlePageChange }></button>
    <button id="next-page" onClick={ props.handlePageChange }></button>
  </div>
);

export default Controls;

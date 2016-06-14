import React from 'react';

const Header = (props) => (
  <div>
    <h1>Browser Test Runner</h1>
    <div>This is the browser test runner.</div>
    <button onClick={props.handleTestStart}>Start Tests</button>
  </div>
);

export default Header;

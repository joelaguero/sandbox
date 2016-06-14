import React, { Component } from 'react';
import Header from './Header.js';
import TestViewContainer from './TestViewContainer.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    // In state, store an object with the status of each test state.
    // Initialize the status to 'Not Started'.

    this.handleTestStart = this.handleTestStart.bind(this);
  }

  handleTestStart() {
    // Start each test and update state accoridng.
    // Pass a callback function that sets the state to be completed once the test has completed.
  }

  render() {
    return (
      <div>
        <Header handleTestStart={this.handleTestStart()}/>
        <TestViewContainer tests={this.props.tests} />
      </div>
    );
  }
}

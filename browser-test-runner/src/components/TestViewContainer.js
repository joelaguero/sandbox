import React from 'react';
import _ from 'lodash';
import TestViewEntry from './TestViewEntry.js';

const TestViewContainer = (props) => (
  <div>
    {props.tests.map((test) => (
      <TestViewEntry test={test} />
    ))}
  </div>
);

export default TestViewContainer;

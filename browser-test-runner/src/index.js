import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import tests from './tests.js';

ReactDOM.render(<App tests={tests}/>, document.getElementById('root'));

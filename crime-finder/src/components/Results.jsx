import React from 'react';
import Table from './Table.jsx';
import Controls from './Controls.jsx';

const Results = (props) => (
  <div>
    <Table crimes={props.crimes} />
    <Controls handlePageChange={props.handlePageChange}/>
  </div>
);

export default Results;

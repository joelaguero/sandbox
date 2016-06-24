import React from 'react';

const Table = (props) => {
  const headers = (() => {
    var result = [];
    if (props.crimes.length > 0) {
      Object.keys(props.crimes[0]).forEach((key) => (
        result.push(<td>{key}</td>)
      ));
    }
    return result;
  })();

  const rows = (() => {
    var result = [];
    if (props.crimes.length > 0) {
      for (var i = 0; i < props.crimes.length; i++) {
        let cols = [];
        for (var key in props.crimes[i]) {
          cols.push(<td>{props.crimes[i][key]}</td>);
        }
        result.push(<tr>{cols}</tr>);
      }
    }
    console.log(result);
    return result;
  })();

  return (
    <table>
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default Table;

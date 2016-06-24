import React from 'react';
import Results from './Results.jsx';
import request from 'then-request';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crimes: [],
      pageOffset: 0,
    }
    this.limit = 10;

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.handleSearch(this.state.pageOffset);
  }

  handleSearch(offset) {
    // Make an AJAX request with the pageOffset
    request('GET', `http://104.236.160.123:3301/api/data?limit=${this.limit}&offset=${offset}`)
    .done((res) => {
      // Update state (crimes) with the results
      this.setState({
        crimes: JSON.parse(res.body),
      });
      console.log('crimes', this.state.crimes);
    });
  }

  handlePageChange(e) {
    // Calculate the offset
    let newOffset = this.state.pageOffset;

    switch(e.target.id) {
      case 'back-page':
        newOffset--;
        break;
      case 'next-page':
        newOffset++;
        break;
    }
    this.setState({
      pageOffset: newOffset,
    });
    this.handleSearch(newOffset);
  }

  render() {
    return (
      <Results crimes={this.state.crimes} handlePageChange={this.handlePageChange}/>
    );
  }
}

export default App;

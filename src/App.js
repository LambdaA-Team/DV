import React, { Component } from 'react';
import Header from './components/Header';
import RestaurantContainer from './components/RestaurantContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <RestaurantContainer />
        </div>
      </div>
    );
  }
}

export default App;

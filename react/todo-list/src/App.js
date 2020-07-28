import React, { Component } from 'react';
import Todo from './Components/Todo';

class App extends Component {
  render() {
    return (
      <div className="main-container-wrapper">
        <Todo />
      </div>
    );
  }
}

export default App;

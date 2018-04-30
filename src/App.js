import React, { Component } from 'react';
import './App.css';
import Skilltree from './components/Skilltree/Skilltree'
import { ReactCytoscape } from 'react-cytoscape';
console.log(Skilltree)
console.log(ReactCytoscape)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Skilltree />
      </div>

    );
  }
}

export default App;

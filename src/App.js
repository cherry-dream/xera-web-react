import React, { Component } from 'react';
import './App.css';
import Skilltree from './components/Skilltree'
import { ReactCytoscape } from 'react-cytoscape';
import PageScroller from './components/PageScroller';
import Home from './views/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PageScroller>
          <Home/>
          <div>Page 2</div>
          <div>Page 3</div>
        </PageScroller>
      </div>

    );
  }
}

export default App;

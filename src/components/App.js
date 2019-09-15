import React, { Component } from 'react';
import RenderEngine from '../utils/RenderEngine';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.renderEngine = new RenderEngine('glCanvas', {
      background: [0, 0, 0]
    });

    this.renderEngine.update();
  }

  render() {
    return (
      <div className="App">
        <canvas id="glCanvas" />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import RenderEngine from '../utils/RenderEngine';
import './App.css';

class App extends Component {
  componentDidMount() {
    RenderEngine.init('glCanvas');
    RenderEngine.drawScene();
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

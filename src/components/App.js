import React, { Component } from 'react';
import RenderEngine from '../utils/RenderEngine';
import './App.css';

class App extends Component {
  componentDidMount() {
    RenderEngine.init('glCanvas');
    // RenderEngine.drawRectangle({ x: 0, y: 50, width: 200, height: 100 });
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

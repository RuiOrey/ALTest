import React, { Component } from 'react';
// import logo from './logo.svg';
import logo from './assetslux.png';

import './App.css';
import { RendererTest } from './webgl/RendererTest';

class App extends Component {
    render()
        {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to Asets-Lux TEST</h1>
                    </header>
                    <p className="App-intro">
                        {/*To get started, edit <code>src/App.js</code> and save to reload. */}
                    </p>
                    <RendererTest></RendererTest>
                </div>
            );
        }
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card1 from './_component/Card'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Identity
        </p>
        <Card1/>
      </header>
    </div>
  );
}

export default App;

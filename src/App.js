import React from 'react';
import './App.css';
import Card from "./Components/Card.jsx"

function App() {
  return (
    <div className="App">

      <div className="home__header">
        <div className="home__title">
          <h2>Classroom</h2>
        </div>
        <div className="home__profile">
            Login/Sign-Up
        </div>
      </div>

      <div className="home__container">

    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
      

      </div>

    </div>
  );
}

export default App;

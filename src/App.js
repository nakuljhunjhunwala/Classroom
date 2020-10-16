import React from 'react';
import './App.css';
import Card from "./Components/Card.jsx"
import Divider from '@material-ui/core/Divider';
import Add from "./Components/Add.jsx"
import Avatar from '@material-ui/core/Avatar';


function App() {
  return (
    <div className="App">

      <div className="home__header">
        <div className="home__title">
          <h2>Classroom</h2>
        </div>
        <div className="home__profile">
        <Avatar alt="Dev Shah" src="/broken-image.jpg" className="home__Profile" />
        </div>
      </div>
      <Divider/>

      <div className="home__container">

    <Card subject="Python"></Card>
    <Card subject="Business"></Card>
    <Card subject="C++"></Card>
    <Card subject="Java"></Card>
      


<Add/>
      </div>

    </div>
  );
}

export default App;

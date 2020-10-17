import React from 'react';
import './App.css';
import Card from "./Components/Card.jsx"
import Divider from '@material-ui/core/Divider';
import Add from "./Components/Add.jsx"
import Header from "./Components/Header.jsx"
import JoinClassPopup from "./Components/JoinClassPopup.jsx"
import CreateClassLayout from "./Components/CreateClassLayout.jsx"


function App() {
  return (
    <div className="App">

<JoinClassPopup/>
<CreateClassLayout/>

     <Header/>
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

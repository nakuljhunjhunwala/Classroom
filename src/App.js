import React from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Home from "./Routes/Home.jsx"
import ChatBox from "./Routes/ChatBox.jsx"


function App() {
  return (
    <div className="App">

    {/* {!user ? (
      <Login/>
    ): ( */}
       <Router>
          <Switch>   
            <Route path="/Chat" >
              <ChatBox/>
            </Route>
            <Route path="/" >
              <Home/>
            </Route>
          </Switch>
        </Router>
    {/* )
    } */}
    </div>
  );
}

export default App;

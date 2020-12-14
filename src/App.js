import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home.jsx";
import ChatBox from "./Routes/ChatBox.jsx";
import Login from "./Routes/Login.jsx";
import { useStateValue } from "./Components/StateProvider";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Switch>
            <Route path="/Chat/:subID/:student_id">
              <ChatBox />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;

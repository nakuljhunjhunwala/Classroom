import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Header.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../Components/StateProvider.js";
import logo from "../images/logo.png";
import { auth } from "../firebase";
import { actionTypes } from "../Components/Reducer";

export default function Header() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  const logout = async () => {
    await auth.signOut();
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
  };

  return (
    <div className="home__header">
      <div className="home__title">
        <Link to={`/`}>
          <img src={logo} alt="logo" />
        </Link>
        <Link to={`/`}>
          <h2>Classroom</h2>
        </Link>
      </div>
      <div className="home__profile">
        <Avatar alt="logo" src={user?.photoURL} />
        <div className="logout">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

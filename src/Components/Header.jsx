import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import "./Header.css"
import { Link } from 'react-router-dom'
import { useStateValue } from "../Components/StateProvider.js";
import logo from  "../images/logo.png"

export default function Header() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
    

    return (
        <div className="home__header">
        <div className="home__title">
        <Link  to={`/`}><img src={logo} alt="logo" />
          <h2>Classroom</h2>
          </Link>
        </div>
        <div className="home__profile">
        <Avatar alt="logo" src={user?.photoURL} />
        </div>
      </div>
    )
}

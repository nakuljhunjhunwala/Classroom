import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import "./Header.css"

export default function Header(props) {
    

    return (
        <div className="home__header">
        <div className="home__title">
          <h2>Classroom</h2>
        </div>
        <div className="home__profile">
        <Avatar alt="Dev Shah" src="/broken-image.jpg"  />
        </div>
      </div>
    )
}

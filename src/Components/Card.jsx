import React from 'react'
import "./Card.css"
import Avatar from '@material-ui/core/Avatar';

export default function Card({subject}) {
    

    return (
        <div className="wrapper">
    <div className="header">
    <Avatar alt={subject} src="/broken-image.jpg" className="Aimg" />
    </div>

    <div className="body">
        <div className="text">
    <h1>{subject}</h1>
        </div>
    </div>
</div>
    )
}

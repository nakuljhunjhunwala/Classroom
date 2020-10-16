import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import "./Add.css"

export default function Add(props) {
    

    return (
        <div className="addicon">
            <Fab color="secondary" aria-label="add" >
        <AddIcon />
      </Fab> 
        </div>
        
    )
}

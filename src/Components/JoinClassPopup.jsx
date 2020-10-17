import React from 'react'
import "./JoinClassPopup.css"
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';

export default function Joinclasspopup(props) {
    

    return (
        <div className="bgCover" id="bgCover" onClick={()=>{
            document.getElementById("bgCover").style.display = "none";
        }}>
            <div className="popup">
                <ButtonBase className="joinClass__btn" onClick={()=>{
            document.getElementById("createClass__bgCover").style.display = "block";
        }}>
                    Create
                </ButtonBase>
                <Divider/>
                <ButtonBase className="joinClass__btn" onClick={()=>{
            document.getElementById("joinClass__bgCover").style.display = "block";
        }}>
                    Join
                </ButtonBase>
            </div>
        </div>
    )
}

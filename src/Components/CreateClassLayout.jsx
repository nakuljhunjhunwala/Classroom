import React , {useState} from 'react'
import "./CreateClassLayout.css"
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        position:"absolute",
        padding: "6px",
        color: "white",
        backgroundColor: "green",
        borderRadius:"5px",
        fontSize:"15px",
        bottom:"10px",
        right:"10px",
    }
  }));

export default function Createclasslayout(props) {
    const [Code, setCode] = useState("")

    const classes = useStyles();
    

    return (
        <div className="createClass__bgCover" id="createClass__bgCover">
            <div className="wrapper createClass__center">
    <div className="header">
    <Avatar alt={Code} src="/broken-image.jpg" className="Aimg" />
    </div>

    <div className="body">
        <div className="text">
            <input className="createCard__input" value={Code} placeholder="Subject Name" onChange={(e)=>{
                setCode(e.target.value);
            }} />
            
        </div>
    </div>
    <ButtonBase className="Create__btn" className={classes.root}>
                    Create
                </ButtonBase>
        </div>
        </div>
    )
}

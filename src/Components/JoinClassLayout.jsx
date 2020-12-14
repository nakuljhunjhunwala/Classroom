import React, { useState } from "react";
import "./JoinClassLayout.css";
import Avatar from "@material-ui/core/Avatar";
import ButtonBase from "@material-ui/core/ButtonBase";
// eslint-disable-next-line no-unused-vars
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "./StateProvider";
import db from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    padding: "6px",
    color: "white",
    backgroundColor: "green",
    borderRadius: "5px",
    fontSize: "15px",
    bottom: "10px",
    right: "10px",
  },
}));

export default function Joinclasslayout(props) {
  const [Code, setCode] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();
  const student_id = user.uid;


  
  function joinClass() {
    db.child(`students/user_data/${student_id}/classes`).update({
      [Code]:Code
      }
      )
    document.getElementById("createClass__bgCover").style.display = "none";
}

  return (
    <div className="joinClass__bgCover" id="joinClass__bgCover">
      <div className="wrapper joinClass__center">
        <div className="header">
          <Avatar alt={Code} src="/broken-image.jpg" className="Aimg" />
        </div>

        <div className="body">
          <div className="text">
            <input
              className="joinCard__input"
              value={Code}
              placeholder="Enter code"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </div>
        </div>
        <ButtonBase 
        className="Join__btn" 
        // eslint-disable-next-line react/jsx-no-duplicate-props
        className={classes.root}
        onClick={() => {
          joinClass();
          setCode("");
        }}>
          Join
        </ButtonBase>
      </div>
    </div>
  );
}

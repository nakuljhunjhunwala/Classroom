import React, { useState } from "react";
import "./JoinClassLayout.css";
import Avatar from "@material-ui/core/Avatar";
import ButtonBase from "@material-ui/core/ButtonBase";
// eslint-disable-next-line no-unused-vars
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";

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

  const classes = useStyles();

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
        className={classes.root}>
          Join
        </ButtonBase>
      </div>
    </div>
  );
}

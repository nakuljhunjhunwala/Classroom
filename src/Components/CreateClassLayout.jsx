import React, { useState } from "react";
import "./CreateClassLayout.css";
import Avatar from "@material-ui/core/Avatar";
import ButtonBase from "@material-ui/core/ButtonBase";
// eslint-disable-next-line no-unused-vars
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "./StateProvider";
import randomatic from "randomatic";
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

export default function Createclasslayout(props) {
  const [Code, setCode] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();
  

  const student_id = user.uid;


  function createClass() {
      let randomCode=randomatic("Aa0", 6);
    db.child("classes")
      .child("subjects")
      .push(
        {
          code: randomCode,
          message: {
            0: {
              userID: "12345678",
              user_name: "Sample",
              user_message: "Sample",
            },
          },
          name: Code,
        },
        (err) => {
          if (err) console.log(err);
          else{
db.child(`students/user_data/${student_id}/classes`).update({
[randomCode]:randomCode
}
)
          }
        }
      );
      document.getElementById("createClass__bgCover").style.display = "none";
  }

  return (
    <div className="createClass__bgCover" id="createClass__bgCover">
      <div className="wrapper createClass__center">
        <div className="header">
          <Avatar alt={Code} src="/broken-image.jpg" className="Aimg" />
        </div>

        <div className="body">
          <div className="text">
            <input
              className="createCard__input"
              value={Code}
              placeholder="Subject Name"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </div>
        </div>
        <ButtonBase
          className="Create__btn"
          // eslint-disable-next-line react/jsx-no-duplicate-props
          className={classes.root}
          onClick={() => {
            createClass();
            setCode("");
          }}
        >
          Create
        </ButtonBase>
      </div>
    </div>
  );
}

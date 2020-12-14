/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import "./Login.css";
import { auth, provider } from "../firebase";
import { actionTypes } from "../Components/Reducer";
import { useStateValue } from "../Components/StateProvider";
import db from "../firebase";

export default function Login(props) {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  const [students, setstudents] = useState(null);
  const [dbUsers, setDbUsers] = useState([]);

  useEffect(() => {
    db.on(
      "value",
      function (snapshot) {
        setstudents(snapshot.val().students);
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
    setDbUsers([]);
    for (let userKey in students?.user_data) {
      setDbUsers((dbUsers) => [...dbUsers, userKey]);
    }
  }, [students]);

  

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (dbUsers.includes(result.user.uid)) {
        } else {
          db.child(`students/user_data/${result.user.uid}`).update(
            {
                userID: result.user.uid,
                student_name: result.user.displayName,
            },
            (err) => {
              if (err) console.log(err);
            }
          );
        }

        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login_body">
      <div className="form-structor">
        <div className="signup slide-up">
          <h2
            className="form-title"
            id="signup"
            onClick={(e) => {
              let parent = e.target.parentNode;
              Array.from(e.target.parentNode.classList).find((element) => {
                if (element !== "slide-up") {
                  parent.classList.add("slide-up");
                } else {
                  document
                    .getElementById("login")
                    .parentNode.parentNode.classList.add("slide-up");
                  parent.classList.remove("slide-up");
                }
              });
            }}
          >
            <span>or</span>Sign up
          </h2>
          <div className="form-holder">
            <input type="text" className="input" placeholder="Name" />
            <input type="email" className="input" placeholder="Email" />
            <input type="password" className="input" placeholder="Password" />
          </div>
          <button className="submit-btn">Sign up</button>
        </div>
        <div className="login ">
          <div className="center">
            <h2
              className="form-title"
              id="login"
              onClick={(e) => {
                let parent = e.target.parentNode.parentNode;
                Array.from(e.target.parentNode.parentNode.classList).find(
                  (element) => {
                    if (element !== "slide-up") {
                      parent.classList.add("slide-up");
                    } else {
                      document
                        .getElementById("signup")
                        .parentNode.classList.add("slide-up");
                      parent.classList.remove("slide-up");
                    }
                  }
                );
              }}
            >
              <span>or</span>Log in
            </h2>
            <div className="form-holder">
              <input type="email" className="input" placeholder="Email" />
              <input type="password" className="input" placeholder="Password" />
            </div>
            <button className="submit-btn">Log in</button>
            <br />
            <br />
            <button
              type="button"
              className="login-with-google-btn"
              onClick={() => {
                signIn();
              }}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

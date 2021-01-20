/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import "./Login.css";
import { auth, provider } from "../firebase";
import { actionTypes } from "../Components/Reducer";
import { useStateValue } from "../Components/StateProvider";
import db from "../firebase";
import Preloader from "../Components/Preloader";

export default function Login(props) {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);


useEffect(()=>{

let subscrible = () => {
  auth.setPersistence("session")
  .then(function() {
    return auth.onAuthStateChanged((result)=>{
      dispatch({
        type: actionTypes.SET_USER,
        user: result,
      });
    })
  })
  .catch(function(error) {
  console.log(error.message);
  });
}

subscrible();

},[dispatch,user])

  const signIn = () => {
    
    
    auth
      .signInWithPopup(provider)
      .then((result) => {
        db.child(`students/user_data/${result.user.uid}`).update(
          {
            userID: result.user.uid,
            student_name: result.user.displayName,
          },
          (err) => {
            if (err) console.log(err);
          }
        );

        db.child(`students/user_data/${result.user.uid}/classes`).update(
          {
           0:1234,
          },
          (err) => {
            if (err) console.log(err);
          }
        );


        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => setMessage(error.message));
  };

  function customCreateUser(e) {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: name,
          })
          .then(function () {
            db.child(`students/user_data/${user.user.uid}`).update(
              {
                userID: user.user.uid,
                student_name: user.user.displayName,
                classes: {
                  0: 1234,
                },
              },
              (err) => {
                if (err) setMessage(err.message);
              }
            );

            dispatch({
              type: actionTypes.SET_USER,
              user: user.user,
            });
          })
          .catch(function (error) {
            setMessage(error.message);
          });
      })
      .catch(function (error) {
        if (error) {
          setMessage(error.message);
        }
      });
  }

  function customLogin(e) {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password).then((user) => {
        if (user) {
          dispatch({
            type: actionTypes.SET_USER,
            user: user.user,
          });
        }
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }

  function forgetPassword() {
    auth.sendPasswordResetEmail(email).then(function() {
      setMessage("Reset link sent to your email address")
    }).catch(function(error) {
      setMessage(error.message)
    });
  }

  
  window.onload = ()=>{
    document.getElementById("preloader-container").style.display = "none";
  }

  return (
    <div className="login_body">
      <Preloader></Preloader>
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
          <form>
            <div className="form-holder">
              <input
                type="text"
                className="input"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="submit-btn"
              onClick={(e) => {
                customCreateUser(e);
                setName("");
                setPassword("");
                setEmail("");
              }}
            >
              Sign up
            </button>
            {message && <p className="login_message">{message}</p>}
          </form>
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
            <form>
              <div className="form-holder">
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <p className="reset_password" onClick={()=>{
                  forgetPassword();
                }}>Reset password?</p>
              </div>
              <button
                type="submit"
                className="submit-btn"
                onClick={(e) => {
                  customLogin(e);
                  setName("");
                  setPassword("");
                  setEmail("");
                }}
              >
                Log in
              </button>
            </form>
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

            {message && <p className="login_message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

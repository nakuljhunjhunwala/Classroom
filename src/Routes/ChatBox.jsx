/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Header from "../Components/Header.jsx";
import Divider from "@material-ui/core/Divider";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import db from "../firebase";
import { useStateValue } from "../Components/StateProvider.js";
import "./ChatBox.css";

export default function Chatbox(props) {
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState("");
  const { subID, student_id } = useParams("/Chat/:subID/:student_id");
  const [classes, setclasses] = useState(null);
  const [message, setMessage] = useState([]);
  const [subjectKey, setSubjectKey] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    db.on(
      "value",
      function (snapshot) {
        setclasses(snapshot.val().classes);
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }, []);

  useEffect(() => {
    if (classes?.subjects) {
      for (let subject in classes.subjects) {
        classes.subjects[subject].code == subID &&
          setSubject(classes.subjects[subject]);
        classes.subjects[subject].code == subID && setSubjectKey(subject);
      }
    }
  }, [subID, classes]);

  useEffect(() => {
    setMessage([]);
    for (let msg in subject.message) {
      setMessage((message) => [...message, subject.message[msg]]);
    }
  }, [subject]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.child(`classes/subjects/${subjectKey}/message`).push(
      {
        userId: student_id,
        user_message: input,
        user_name: user.displayName,
      },
      (err) => {
        if (err) console.log(err);
      }
    );

    setInput("");
  };

  return (
    <div>
      <Header />
      <Divider />
      <div className="subject__name">
        <h1> {subject?.name} </h1>
        <h3>Code:- {subject?.code}</h3>
      </div>
      <div className="chat__container">
        <div className="message__container">
          {message?.map((msg, i) => {
            return (
              <p
                key={i}
                className={`chat__message  ${
                  msg.userId == student_id && "chat__reciever"
                }`}
              >
                <span className="chat__name">{msg.user_name}</span>
                {msg.user_message}
              </p>
            );
          })}
        </div>
        <Divider />
        <div className="message__input">
          <div className="message__input__left">
            <Avatar src={user?.photoURL} className="messageBox__ava" />
          </div>
          <div className="message__input__right">
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a Message"
                type="text"
                style={{ resize: "none", height: "15px" }}
              />

              <button onClick={sendMessage} type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

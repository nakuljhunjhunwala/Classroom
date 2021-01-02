/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Header from "../Components/Header.jsx";
import Divider from "@material-ui/core/Divider";
import FileUpload from "../Components/FileUpload";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import db from "../firebase";
import { useStateValue } from "../Components/StateProvider.js";
import "./ChatBox.css";
import FilePreview from "../Components/FilePreview.jsx";

export default function Chatbox(props) {
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState("");
  const { subID, student_id } = useParams("/Chat/:subID/:student_id");
  const [classes, setclasses] = useState(null);
  const [message, setMessage] = useState([]);
  const [subjectKey, setSubjectKey] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [files, setFiles] = useState([]);
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

  useEffect(() => {
    setFiles([]);
    for (let document in subject?.files) {
      setFiles((files) => [...files, subject?.files[document]]);
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
    let check = document.getElementById("fileVisible");
    check.checked = 0;
    setIsOn(false);
    setInput("");
  };

  return (
    <div>
      <FileUpload subID={subID} setIsOn={setIsOn} subjectKey={subjectKey}></FileUpload>
      <Header />
      <Divider />
      <div className="subject__name">
        <h1> {subject?.name} </h1>
        <h3>Code:- {subject?.code}</h3>
        <div className="content">
          <label>Show files only:-</label>
          <label className="switch">
            <input
              type="checkbox"
              id="fileVisible"
              className="fileVisible"
              onChange={(e) => {
                document.getElementById("fileVisible").checked ? setIsOn(true) : setIsOn(false);
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="chat__container">
        {isOn ? (
          <div className="file_container">


{
  files.length>0 ?
   (
     files.map((file,i)=>{
        return(<FilePreview key={i} fileName={file.file_name} fileType={file.file_type} fileSize={file.file_size} url={file.file_url} />)
     })
     ) :
     (
     <h1 className="emptyFile ">No Files Available</h1>
     )
    }


          </div>
        ) : (
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
        )}

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
          <div className="file__input__right">
            <AttachFileIcon
              className="messageBox__file"
              onClick={() => {
                document.getElementById("fileUpload_bgCover").style.display = "Block";
              }}
            ></AttachFileIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

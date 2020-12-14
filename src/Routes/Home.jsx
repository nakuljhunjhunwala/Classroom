/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Home.css";
import Card from "../Components/Card.jsx";
import Divider from "@material-ui/core/Divider";
import Add from "../Components/Add.jsx";
import Header from "../Components/Header.jsx";
import JoinClassPopup from "../Components/JoinClassPopup.jsx";
import CreateClassLayout from "../Components/CreateClassLayout.jsx";
import JoinClassLayout from "../Components/JoinClassLayout.jsx";
import { Link } from "react-router-dom";
import { useStateValue } from "../Components/StateProvider.js";
import db from "../firebase";

export default function Home(props) {
  const [user_subject, setSubject] = useState([]);
  const [classes, setclasses] = useState(null);
  const [students, setstudents] = useState(null);
  const [data, setData] = useState([]);
// eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  const student_id = user.uid;

  useEffect(() => {
    db.on(
      "value",
      function (snapshot) {
        setclasses(snapshot.val().classes);
        setstudents(snapshot.val().students);
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }, []);

  useEffect(() => {
    if (students) {
      for (let student_data in students.user_data) {
        console.log(students.user_data[student_data].classes);
        students.user_data[student_data].userID === student_id &&
          setSubject(students.user_data[student_data].classes);
      }
    }
  }, [student_id, students]);

  useEffect(() => {
    setData([]);
    if (user_subject[0] && classes.subjects) {
      console.log("testing :" + user_subject);
      for (let code in user_subject) {
        for (let chk_sub in classes.subjects) {
          if (classes.subjects[chk_sub].code === user_subject[code]) {
            console.log(data);
            setData((data) => [...data, classes.subjects[chk_sub]]);
          }
        }
      }
    }
  }, [user_subject]);

  return (
    <div>
      <JoinClassPopup />
      <CreateClassLayout />
      <JoinClassLayout />

      <Header />
      <Divider />

      <div className="home__container">
        {data[0] ? (
          data.map((code) => {
            return (
              <Link key={code?.code} to={`/Chat/${code?.code}/${student_id}`}>
                <Card subject={code?.name} subject_code={code?.code} />{" "}
              </Link>
            );
          })
        ) : (
          <h1 className="empty">No Subjects Available</h1>
        )}

        <Add />
      </div>
    </div>
  );
}

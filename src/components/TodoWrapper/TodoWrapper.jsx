import React from "react";
import Todo from "../Todo/Todo";
import "./TodoWrapper.scss";
import { useGlobalContext } from "../../context/TaskContext";

export default function Posts() {
  const { todos } = useGlobalContext();
  // sana va vaqtlarni saralash
  let data = todos.sort((a, b) => {
    let timeA = a.time.split(":")[0];
    let timeB = b.time.split(":")[0];
    return timeA - timeB;
  });
  let bugun = data.filter(item => item.day === "bugun");
  let ertaga = data.filter(item => item.day === "ertaga");
  let keyin = data.filter(item => item.day === "keyin").sort((a, b) => {
    let timeA = new Date(...a?.date.split(":")).getTime();
    let timeB = new Date(...b?.date.split(":")).getTime();
    return timeA - timeB;
  });
  if (todos?.length == 0) {
    return (
      <div className="box">
        <div className="container">
          <h1 className="box-empty">Your bag is empty now!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="box">
      {bugun.length > 0 && <>
        <h2>Bugun</h2>
        <div className="box-day">
          {bugun.map((item, idx) => {
            if (item.day === "bugun") {
              return <Todo key={idx} {...item} />;
            }
          })}
        </div></>}
      {
        ertaga.length > 0 && <>
          <h2>Ertaga</h2>
          <div className="box-day">
            {ertaga.map((item, idx) => {
              if (item.day === "ertaga") {
                return <Todo key={idx} {...item} />;
              }
            })}
          </div></>
      }
      {
        keyin.length > 0 && <>
          <h2>Keyin</h2>
          <div className="box-day">
            {keyin.map((item, idx) => {
              if (item.day === "keyin") {
                return <Todo key={idx} {...item} />;
              }
            })}
          </div></>
      }
    </div>
  );
}

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
  let keyin = [];
  for (const item of todos) {
    if (item.day === "keyin") {
      keyin.push(item);
    }
  }
  keyin = keyin.sort((a, b) => {
    let timeA = new Date(...a?.date.split(":")).getTime();
    let timeB = new Date(...b?.date.split(":")).getTime();
    return timeA - timeB;
  })
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
          {data.map((item) => {
            if (item.day === "bugun" && item.completed === false) {
              return <Todo key={item.id} {...item} />;
            }
          })}
          {data.map((item) => {
            if (item.day === "bugun" && item.completed === true) {
              return <Todo key={item.id} {...item} />;
            }
          })}
        </div></>}
      {
        ertaga.length > 0 && <>
          <h2>Ertaga</h2>
          <div className="box-day">
            {data.map((item) => {
              if (item.day === "ertaga" && item.completed === false) {
                return <Todo key={item.id} {...item} />;
              }
            })}
            {data.map((item) => {
              if (item.day === "ertaga" && item.completed === true) {
                return <Todo key={item.id} {...item} />;
              }
            })}
          </div></>
      }
      {
        keyin.length > 0 && <>
          <h2>Keyin</h2>
          <div className="box-day">
            {keyin.map((item) => {
              if (item.day === "keyin" && item.completed === false) {
                return <Todo key={item.id} {...item} />;
              }
            })}
            {keyin.map((item) => {
              if (item.day === "keyin" && item.completed === true) {
                return <Todo key={item.id} {...item} />;
              }
            })}
          </div>
        </>
      }
    </div>
  );
}

import React, { useState } from "react";
import "./Todo.scss";
import { useGlobalContext } from "../../context/TaskContext";

export default function Post({ id, title, completed,date, time }) {
  const { toggleItem } = useGlobalContext();
  const [active,setActive]= useState(false);
  // checkbox ni tekshirish
  const handleCheck =()=>{
    setActive(!active)
    toggleItem(id);
  }
  return (
    <div className="item">
      <div className="item-view">
        <input type="checkbox" name="complete" id={`item-${id}`} value={active} checked={completed} onChange={ handleCheck} className={"item-check"} />
        <label htmlFor={`item-${id}`} className={` item-name ${completed && 'stroke'}`}>
          {title}
        </label>
      </div>
      <div className="item-control">
        <p className={` item-name ${completed && 'stroke'}`}>{date} {time}</p>
      </div>
    </div>
  );
}

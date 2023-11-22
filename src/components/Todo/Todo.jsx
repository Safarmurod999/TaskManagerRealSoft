import React, { useState } from "react";
import "./Todo.scss";
import { useGlobalContext } from "../../context/TaskContext";

export default function Post({ id, title, completed,date, time }) {
  const { removeItem, toggleItem } = useGlobalContext();
  const [active,setActive]= useState(false);
  // checkbox ni tekshirish
  const handleCheck =()=>{
    setActive(!active)
    toggleItem(id);
  }
  return (
    <div className="item">
      <div className="item-view">
        <input type="checkbox" name="complete" value={active} checked={completed} onChange={ handleCheck} className={"item-check"} />
        <p className={` item-name ${completed && 'stroke'}`}>
          {title}
        </p>
      </div>
      <div className="item-control">
        <p className={` item-name ${completed && 'stroke'}`}>{date} {time}</p>
        <button className="item-btn" onClick={() => removeItem(id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

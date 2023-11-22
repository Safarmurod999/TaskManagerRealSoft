import React, { useState } from 'react'
import "./InputBar.scss";
import { useGlobalContext } from '../../context/TaskContext';
function InputBar() {
  const {addItem} =useGlobalContext();
  const [title,setTitle]=useState("");
  // submit uchun funksiya
  const handleSubmit = (e)=>{
    e.preventDefault();
    addItem(title);
    setTitle("");
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" className='form__input' onChange={(e)=>setTitle(e.target.value)} value={title} placeholder="Yangi vazifa qo'shish" min={"1"} max={"50"} required />
      <button type='submit' className='form__submit'>
        <i className="fa-solid fa-plus"></i>
        </button>
    </form>
  )
}

export default InputBar
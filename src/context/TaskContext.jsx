import { createContext, useContext, useReducer } from "react";

import reducer from "../reducer/reducer";

const TaskContext = createContext();
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// boshlang'ich ma'lumotlar
const initialState = {
  todos: todos,
  total: todos.length,
  completed: todos.filter(todo => todo.completed === true).length,
  days: ['bugun', 'ertaga', 'keyin'],
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const removeItem = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const addItem = (data) => {
    dispatch({ type: "ADD", payload: data });
  };
  const toggleItem = (id) => {
    dispatch({ type: "TOGGLE", payload: id });
  };
  return (
    <TaskContext.Provider
      value={{
        ...state,
        removeItem,
        addItem,
        toggleItem,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(TaskContext);
};

export { TaskContext, TaskProvider };

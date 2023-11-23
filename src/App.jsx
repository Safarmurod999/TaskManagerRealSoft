import { useState } from "react";
import "./App.scss";
import { InputBar, TodoWrapper } from "./components/index";
import { useGlobalContext } from "./context/TaskContext";

function App() {
  const { total, completed } = useGlobalContext();
  let [date, setDate] = useState("");
  setTimeout(() => {
    let current = new Date().toLocaleString();
    setDate(current);
  }, 1000);
  return (
    <section className="todo-app">
      <div className="todo-app__title">
        Vazifalar Menedjeri
      </div>
      <InputBar />
      <p>Bugun: {date}</p>
      <TodoWrapper />
      <p style={{ marginTop:"30px",textAlign: "right" }}>Bajarilganlar:{completed}</p>
      <p style={{ textAlign: "right" }}>Bajarilmaganlar:{total - completed}</p>
    </section>
  );
}

export default App;

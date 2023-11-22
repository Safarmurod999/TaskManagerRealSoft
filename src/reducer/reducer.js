const reducer = (state, action) => {
  // Yangi taskni qo'shish
  if (action.type === "ADD") {

    let id = state.todos.at(-1)?.id + 1 || 0;
    let strArr = action.payload.split(" ");
    let time = new Date().getHours() + 1;
    // task ning default holati
    let todo = {
      id,
      title: action.payload,
      day: "bugun",
      completed: false,
      time: `${time}:00`,
    };
    //  task ning bugun ertaga yoki keyinga ekanini aniqlash
    for (const str of strArr) {
      if (state.days.includes(str.toLowerCase())) {
        if (str == "ertaga" || str =="keyin") {
          todo.time = "9:00";
        }
        todo.day = str.toLowerCase();
        let task = strArr.join(" ").replace(str, "");
        todo.title = task;
      }
      // task ning sanasini aniqlash
      if (str[2] == "." || str[1] == ".") {
        let timeStr = str.split(".");
        if (!isNaN(+timeStr[0]) && !isNaN(+timeStr[1]) && !isNaN(+timeStr[2])) {
          if (
            (timeStr[0] > 0 &&
              timeStr[1] > 0 &&
              timeStr[2] > 0 &&
              timeStr[1] <= 12 &&
              timeStr[0] <= 31) ||
            (timeStr[1] === 2 && timeStr[0] < 29)
          ) {
            let newStrArr = strArr.join(" ").replace(str, "");
            // task ning soati o'tib ketgan sana yoki yo'qligini tekshirish
            if (new Date() < new Date(timeStr.reverse().join("-"))) {
              todo.date = timeStr.join(":");
              todo.time = "9:00";
              todo.day = "keyin";
              todo.title = newStrArr;
            }
          }
        }
      }
      // task ning soatini aniqlash
      if (str[2] == ":" || str[1] == ":") {
        let timeStr = str.split(":");
        if (!isNaN(+timeStr[0]) && !isNaN(+timeStr[1])) {
          if (
            timeStr[0] >= 0 &&
            timeStr[1] >= 0 &&
            timeStr[0] <= 23 &&
            timeStr[1] <= 59
          ) {
            if (new Date().getHours() < timeStr[0]) {
              let newStrArr = strArr.join(" ").replace(str, "");
              todo.time = timeStr.join(":");
              todo.title = newStrArr;
            }
          }
        }
      }
    }
    state.todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(state.todos));
    return {
      ...state,
      total: state.todos.length,
      todos: state.todos,
    };
  }
  // Taskni toggle qilish
  if (action.type === "TOGGLE") {
    // payload ga teng id li elementni completed xususiyatini teskarisiga o'girish
    let completedTodo = state.todos.find((todo) => todo.id === action.payload);
    completedTodo.completed
      ? (completedTodo.completed = false)
      : (completedTodo.completed = true);
      console.log(state.todos);
    localStorage.setItem("todos", JSON.stringify(state.todos));

    return {
      ...state,
      completed: state.todos.filter((todo) => todo.completed === true).length,
      todos: state.todos,
    };
  }
};

export default reducer;

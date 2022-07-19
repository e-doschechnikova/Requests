import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
// CRUD => СRUD
// GUI & CLI
export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TaskStateType = {
  [todolistID: string]: Array<TaskType>;
};

function App() {
  console.log(v1());
  // BLL:
  const todolistID_1 = v1();
  const todolistID_2 = v1();
  const [todoLists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistID_1, title: "What to learn", filter: "all" },
    { id: todolistID_2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todolistID_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS/TS", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todolistID_2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: false },
      { id: v1(), title: "Butter", isDone: false },
    ],
  });

  const removeTask = (taskID: string, todolistID: string): void => {
    const copyTasks = { ...tasks };
    copyTasks[todolistID] = tasks[todolistID].filter((t) => t.id !== taskID);
    setTasks(copyTasks);
  };

  const addTask = (title: string, todolistID: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const copyTasks = { ...tasks };
    copyTasks[todolistID] = [newTask, ...tasks[todolistID]];
    setTasks(copyTasks);
    /*setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]})*/
  };

  const changeFilter = (filter: FilterValuesType, todolistID: string) => {
    setTodolists(
      todoLists.map((tl) => (tl.id === todolistID ? { ...tl, filter } : tl))
    );
  };
  const changeTaskStatus = (
    taskID: string,
    isDone: boolean,
    todolistID: string
  ) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((t) =>
        t.id === taskID ? { ...t, isDone: isDone } : t
      ),
    });
  };

  // UI:
  let tasksForRender;
  switch (filter) {
    case "completed":
      tasksForRender = tasks.filter((t) => t.isDone === true);
      break;
    case "active":
      tasksForRender = tasks.filter((t) => t.isDone === false);
      break;
    default:
      tasksForRender = tasks;
  }
  return (
    <div className="App">
      <TodoList
        //id
        title={title}
        filter={filter}
        tasks={tasksForRender}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;

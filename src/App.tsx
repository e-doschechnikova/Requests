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
  [todoListID: string]: Array<TaskType>;
};

function App() {
  console.log(v1());
  // BLL:
  const todoListID_1 = v1();
  const todoListID_2 = v1();
  const [todoLists, setTodolists] = useState<Array<TodoListType>>([
    { id: todoListID_1, title: "What to learn", filter: "all" },
    { id: todoListID_2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todoListID_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS/TS", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todoListID_2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: false },
      { id: v1(), title: "Butter", isDone: false },
    ],
  });

  const removeTask = (taskID: string, todoListID: string): void => {
    const copyTasks = { ...tasks };
    copyTasks[todoListID] = tasks[todoListID].filter((t) => t.id !== taskID);
    setTasks(copyTasks);
  };

  const addTask = (title: string, todoListID: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const copyTasks = { ...tasks };
    copyTasks[todoListID] = [newTask, ...tasks[todoListID]];
    setTasks(copyTasks);
    /*setTasks({...tasks, [todoListID]:[newTask, ...tasks[todoListID]]})*/
  };

  const changeFilter = (filter: FilterValuesType, todoListID: string) => {
    setTodolists(
      todoLists.map((tl) => (tl.id === todoListID ? { ...tl, filter } : tl))
    );
  };
  const changeTaskStatus = (
    taskID: string,
    isDone: boolean,
    todoListID: string
  ) => {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map((t) =>
        t.id === taskID ? { ...t, isDone: isDone } : t
      ),
    });
  };

  const removeTodoList = (todoListID: string) => {
    setTodolists(todoLists.filter((tl) => tl.id !== todoListID));
    delete tasks[todoListID];
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

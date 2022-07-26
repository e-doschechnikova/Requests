import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { TLSSocket } from "tls";
import { AddItemForm } from "./AddItemForm";
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

  const addTodoList = (title: string) => {
    const newTodoListID = v1();
    const newTodoList: TodoListType = {
      id: newTodoListID,
      title: title,
      filter: "all",
    };
    setTodolists([newTodoList, ...todoLists]);
    setTasks({ [newTodoListID]: [], ...tasks });
  };

  // UI:

  const todoListsComponents = todoLists.map((tl) => {
    let tasksForRender;
    switch (tl.filter) {
      case "completed":
        tasksForRender = tasks[tl.id].filter((t) => t.isDone);
        break;
      case "active":
        tasksForRender = tasks[tl.id].filter((t) => !t.isDone);
        break;
      default:
        tasksForRender = tasks[tl.id];
    }
    return (
      <TodoList
        key={tl.id}
        todoListID={tl.id}
        title={tl.title}
        filter={tl.filter}
        tasks={tasksForRender}
        addTask={addTask}
        removeTask={removeTask}
        removeTodoList={removeTodoList}
        changeFilter={changeFilter}
        changeTaskStatus={changeTaskStatus}
      />
    );
  });

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoListsComponents}
    </div>
  );
}

export default App;

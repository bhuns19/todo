import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { delTask, getAllTasks, patchTask, postTask } from "./ManageTasks";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.complete,
  Completed: (task) => task.complete,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    setTasks(await getAllTasks());
  }, []);

  const [filter, setFilter] = useState("All");

  async function addTask(name) {
    let newTask = await postTask({name: name, complete: false})
    setTasks([...tasks, newTask]);
  }

  async function editTask(id, newName) {
    await patchTask(id, {name: newName})
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  async function deleteTask(id) {
    await delTask(id)
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.complete}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        patchTask(id, {complete: !task.complete})
        return { ...task, complete: !task.complete };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>To Do</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">{filterList}</div>

      <h2 id="list-heading">{headingText}</h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;

import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(["Eat Breakfast", "Take a shower", "Walk the dog"]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask(event) {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditText(tasks[index]);
  }

  function saveEdit(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? editText : task
    );
    setTasks(updatedTasks);
    setEditIndex(null); 
    setEditText(""); 
  }

  function cancelEdit() {
    setEditIndex(null);
    setEditText("");
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      

      <div>
        <input
          type="text"
          placeholder="Enter a Task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>

        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span className="text">{task}</span>
              )}
              <button className="delete-button" onClick={() => deleteTask(index)}>
                Delete
              </button>
              <button className="move-button" onClick={() => moveTaskUp(index)}>
                Up
              </button>
              <button className="move-button" onClick={() => moveTaskDown(index)}>
                Down
              </button>
              {editIndex === index ? (
                <>
                  <button className="save-button" onClick={() => saveEdit(index)}>
                    Save
                  </button>
                  <button className="cancel-button" onClick={cancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="edit-button" onClick={() => handleEdit(index)}>
                  Edit
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
      
    </div>
  );
}

export default ToDoList;

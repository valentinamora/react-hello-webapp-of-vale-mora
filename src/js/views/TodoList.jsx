import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [writeTask, setWriteTask] = useState("");
  const [userList, setUserList] = useState([]);

  function addTask(event) {
    if (event.key === "Enter") {
      setWriteTask("");
      addItemsPost(writeTask);
    }
  }
//trae a todos los usuarios 
  const getAllUsers = async () => {
    try {
      let response = await fetch("https://playground.4geeks.com/todo/users");
      let data = await response.json();
      setUserList(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserVale = () => {
    fetch("https://playground.4geeks.com/todo/users/valeRePiola")
      .then((res) => res.json())
      .then((data) => setTasks(data.todos));
  };
//este los trae posta
  useEffect(() => {
    getAllUsers();
    getUserVale();
  }, []);
//elimina los tasks uno por uno 
  const deleteItems = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getUserVale();
    });
  };

  const addItemsPost = (label) => {
    fetch(`https://playground.4geeks.com/todo/todos/valeRePiola`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: label,
        is_done: false,
      }),
    }).then(() => {
      getUserVale();
    });
  };
// elimina todos permannetemente como el que elimina los tasks pero este es para todos juntos.
  const deleteAllItems = () => {
    tasks.forEach((task) => {
      fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          getUserVale();
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
        });
    });
  };

  return (
    <>
      <div className="text-center">
        <h4>Users List</h4>
        {userList.map((item) => {
          return (
            <li key={item.id}>
              {item.name}
            </li>
          );
        })}
        <h4>todos</h4>
      </div>
      <div className="container d-flex align-items-center">
        <div className="card">
          <input
            type="text"
            placeholder="What's needs to be done?"
            value={writeTask}
            onKeyDown={(event) => addTask(event)}
            onChange={(event) => setWriteTask(event.target.value)}
          />
          <ul className="list-group list-group-flush">
            {tasks?.map((element, i) => {
              return (
                <li className="list-group-item d-flex justify-content-between">
                  {element?.label}
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={() => deleteItems(element.id)}
                  >
                    <i className="fas fa-backspace"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <button className="" onClick={deleteAllItems}>
          <i className="far fa-trash-alt text-white"></i>
        </button>
      </div>
    </>
  );
};

//que dificil se hizo este codigo, seguir practicandolo. 

export default TodoList;

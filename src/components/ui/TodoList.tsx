"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";
import styles from "./TodoList.module.css";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import TogglePopup from "@/components/ui/TogglePopup";

function TodoList({ username }) {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem(`todos_${username}`));
    return storedTodos || [];
  });
  const [doneList, setDoneList] = useState(() => {
    const storedDoneList = JSON.parse(
      localStorage.getItem(`donelist_${username}`)
    );
    return storedDoneList || [];
  });

  const [newTodoName, setNewTodoName] = useState("");

  // 로컬 스토리지에서 todos와 doneList 불러오기 및 저장하기
  useEffect(() => {
    // 로컬 스토리지에서 불러오기
    const storedTodos = JSON.parse(localStorage.getItem(`todos_${username}`));
    const storedDoneList = JSON.parse(
      localStorage.getItem(`donelist_${username}`)
    );
    if (storedTodos) setTodos(storedTodos);
    if (storedDoneList) setDoneList(storedDoneList);
  }, [username]); // username이 변경될 때만 실행

  // todos가 변경될 때 로컬 스토리지에 저장하기
  useEffect(() => {
    localStorage.setItem(`todos_${username}`, JSON.stringify(todos));
  }, [todos, username]);

  // doneList가 변경될 때 로컬 스토리지에 저장하기
  useEffect(() => {
    localStorage.setItem(`donelist_${username}`, JSON.stringify(doneList));
  }, [doneList, username]);

  const handleInputChange = (e) => {
    setNewTodoName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTodoName.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      name: newTodoName,
      complete: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoName("");
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(updatedTodos);
    // doneList를 업데이트하는 로직
    const updatedDoneList = updatedTodos.filter((todo) => todo.complete);
    setDoneList(updatedDoneList);
  };

  return (
    <div className={styles["todo-list-container"]}>
      <form onSubmit={handleFormSubmit} className={styles["todo-form"]}>
        <input
          type="text"
          value={newTodoName}
          onChange={handleInputChange}
          className={styles["todo-input"]}
          placeholder="Enter new todo"
        />
        <button type="submit" className={styles["todo-button"]}>
          Add Todo
        </button>
      </form>
      <div className={styles["todo-items"]}>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </div>
    </div>
  );
}

TodoList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default TodoList;

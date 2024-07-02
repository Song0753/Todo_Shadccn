"use client";
import React, { useState, useEffect } from "react";
import styles from "./Greeting.module.css";
import TodoList from "./TodoList";
import Clock from "./Clock";
import { Button } from "@/components/ui/button";
import TodoPopup from "./TodoPopUp";

function Greeting() {
  const [name, setName] = useState("");
  const [storedName, setStoredName] = useState(
    localStorage.getItem("name") || ""
  );
  const [inputWidth, setInputWidth] = useState(320);
  const [todoPopupVisible, setTodoPopupVisible] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (storedName) {
      const storedTodos = JSON.parse(localStorage.getItem(`todos_${storedName}`)) || [];
      setTodos(storedTodos);
    }
  }, [storedName]);

  useEffect(() => {
    if (storedName) {
      localStorage.setItem(`todos_${storedName}`, JSON.stringify(todos));
    }
  }, [todos, storedName]);


  const handleInputChange = (e) => {
    setName(e.target.value);
    setInputWidth(Math.max(320, e.target.value.length * 40));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    setStoredName(name);
  };

  const handleAddTodo = (date, text) => {
    const newTodo = { id: Date.now(), date, text, complete: false };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleEditTodo = (id, newText) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  return (
    <div className={styles["page-container"]}>
      <div className={styles["clock-container"]}>
        <Clock />
      </div>
      <div className={styles["greeting-container"]}>
        {!storedName ? (
          <form onSubmit={handleFormSubmit} className={styles["greeting-form"]}>
            <h1>Nice to meet you!</h1>
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              className={styles["greeting-input"]}
              placeholder="Google Nick"
              style={{ width: `${inputWidth}px` }}
            />
            <Button type="submit" className={styles["greeting-button"]}>
              Continue
            </Button>
          </form>
        ) : (
          <div>
            <h1 className={styles["greeting-message"]}>
              Good morning, {storedName}
            </h1>
            <TodoList username={storedName} />
          </div>
        )}
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Button onClick={() => setTodoPopupVisible(true)}>Todo list open</Button>
        <TodoPopup
          isVisible={todoPopupVisible}
          onClose={() => setTodoPopupVisible(false)}
          todos={todos}
          onAddTodo={handleAddTodo}
          onEditTodo={handleEditTodo}
          onDeleteTodo={handleDeleteTodo}
          onToggleTodo={handleToggleTodo}
        />
      </div>
    </div>
  );
}

export default Greeting;
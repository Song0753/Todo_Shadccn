"use client";
import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { ChevronLeft, ChevronRight, Edit, Trash, X } from "lucide-react";
import styles from "./TodoPopUp.module.css";

const TodoPopup = ({
  isVisible,
  onClose,
  todos,
  onAddTodo,
  onEditTodo,
  onDeleteTodo,
  onToggleTodo
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (isVisible) {
      setSelectedDate(new Date());
      setNewTodo("");
    }
  }, [isVisible]);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });

  const handlePrevWeek = () => {
    setSelectedDate(addDays(selectedDate, -7));
  };

  const handleNextWeek = () => {
    setSelectedDate(addDays(selectedDate, 7));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(selectedDate, newTodo);
      setNewTodo("");
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles["todo-popup"]}>
      <div className={styles["todo-popup__content"]}>
        <button
          onClick={onClose}
          className={styles["todo-popup__close-button"]}
        >
          <X size={24} />
        </button>
        <h2 className={styles["todo-popup__title"]}>To-Do List</h2>

        <div className={styles["todo-popup__calendar"]}>
          <button onClick={handlePrevWeek} className={styles["todo-popup__calendar-button"]}>
            <ChevronLeft />
          </button>
          <div className={styles["todo-popup__days"]}>
            {weekDays.map((day, index) => {
              const date = addDays(startDate, index);
              const isSelected =
                format(date, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");
              return (
                <button
                  key={day}
                  className={`${styles["todo-popup__day-button"]} ${isSelected ? styles["todo-popup__day-button--selected"] : ""}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className={styles["todo-popup__day-name"]}>{day}</span>
                  <span className={styles["todo-popup__day-date"]}>{format(date, "d")}</span>
                </button>
              );
            })}
          </div>
          <button onClick={handleNextWeek} className={styles["todo-popup__calendar-button"]}>
            <ChevronRight />
          </button>
        </div>

        <ul className={styles["todo-popup__list"]}>
          {todos
            .filter(
              (todo) =>
                format(new Date(todo.date), "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd")
            )
            .map((todo) => (
              <li
                key={todo.id}
                className={styles["todo-popup__item"]}
              >
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => onToggleTodo(todo.id)}
                />
                <span style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}>{todo.text}</span>
                <div className={styles["todo-popup__item-actions"]}>
                <button onClick={() => onEditTodo(todo.id, prompt("Edit todo:", todo.text))}>
                    <Edit size={16} />
                  </button>
                  <button onClick={() => onDeleteTodo(todo.id)}>
                    <Trash size={16} />
                  </button>
                </div>
              </li>
            ))}
        </ul>

        <div className="flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new task"
            className={styles["todo-popup__input"]}
          />
          <button
            onClick={handleAddTodo}
            className={styles["todo-popup__add-button"]}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPopup;

"use client";
import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";
import styles from "./TodoPopUp.module.css";

const TodoPopup = ({
  isVisible,
  onClose,
  todos = [],
  onAddTodo,
  onEditTodo,
  onDeleteTodo,
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

  return (
    <div className={styles["todo-popup"]}>
      <div className={styles["todo-popup__content"]}>
        <h2 className="text-white text-2xl mb-4">To-Do List</h2>

        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevWeek}>
            <ChevronLeft className="text-white" />
          </button>
          <div className="flex space-x-2">
            {weekDays.map((day, index) => {
              const date = addDays(startDate, index);
              const isSelected =
                format(date, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");
              return (
                <button
                  key={day}
                  className={`w-12 h-16 rounded ${
                    isSelected ? "bg-blue-500" : "bg-gray-700"
                  } text-white flex flex-col items-center justify-center`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="text-xs">{day}</span>
                  <span className="text-lg">{format(date, "d")}</span>
                </button>
              );
            })}
          </div>
          <button onClick={handleNextWeek}>
            <ChevronRight className="text-white" />
          </button>
        </div>

        <ul className="mb-4">
          {todos
            .filter(
              (todo) =>
                format(new Date(todo.date), "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd")
            )
            .map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between text-white mb-2"
              >
                <span>{todo.text}</span>
                <div>
                  <button onClick={() => onEditTodo(todo.id)} className="mr-2">
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
            className="flex-grow mr-2 p-2 rounded bg-gray-700 text-white"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
          {/* 닫기 버튼 추가 */}
          <button
            onClick={onClose}
            className={styles["todo-popup__close-button"]}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPopup;

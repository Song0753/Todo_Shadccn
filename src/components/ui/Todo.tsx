"use client";
import React from "react";
import PropTypes from "prop-types";
import styles from "./Todo.module.css";

function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  if (!todo) {
    return <div>Todo item not found</div>;
  }

  return (
    <div className={styles.todo}>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        <span className={todo.complete ? styles.complete : ""}>
          {todo.name}
        </span>
      </label>
    </div>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

export default Todo;

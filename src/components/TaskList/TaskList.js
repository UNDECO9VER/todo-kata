import React from "react";
import Task from "../Task/Task";
import PropTypes from "prop-types";
import "./TaskList.css";

const TaskList = ({ todos, filter, onDeleted, onToggleDone }) => {
  const getVisibleTodos = (arr, filter) => {
    // eslint-disable-next-line default-case
    switch (filter) {
      case "all":
        return arr;
      case "completed":
        return arr.filter((t) => t.done);
      case "active":
        return arr.filter((t) => !t.done);
    }
  };

  TaskList.defaultProps = {
    todos: [],
    filter: "all",
    onDeleted: () => {},
    onToggleDone: () => {},
  };

  TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
  };

  return (
    <ul className="task-list">
      {getVisibleTodos(todos, filter).map((item) => {
        const { id, ...itemProps } = item;
        return (
          <Task
            key={id}
            {...itemProps}
            onToggleDone={() => onToggleDone(id)}
            onDeleted={() => onDeleted(id)}
          />
        );
      })}
    </ul>
  );
};

export default TaskList;

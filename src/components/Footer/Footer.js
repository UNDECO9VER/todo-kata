import React from "react";
import TaskFilter from "../TaskFilter/TaskFilter";
import PropTypes from "prop-types";
import "./Footer.css";
const Footer = ({ setFilter, taskCount, deleteItem, todos }) => {
  Footer.propTypes = {
    setFilter: PropTypes.func,
    taskCount: PropTypes.number,
    deleteItem: PropTypes.func,
    todos: PropTypes.arrayOf(PropTypes.object),
  };

  Footer.defaultProps = {
    setFilter: () => {},
    taskCount: 0,
    deleteItem: () => {},
    todos: [],
  };

  return (
    <footer className="footer">
      <span className="todo-count">{taskCount} items left</span>
      <TaskFilter setFilter={setFilter} />
      <button
        onClick={() => {
          for (let i of todos) {
            if (i.done) {
              deleteItem(i.id);
            }
          }
        }}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

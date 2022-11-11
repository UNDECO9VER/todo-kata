import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import "./Task.css";

class Task extends Component {
  static defaultProps = {
    label: "",
    important: false,
    done: false,
    readOnly: true,
    onToggleDone: () => {},
    onDeleted: () => {},
    date: new Date(),
  };

  static propTypes = {
    label: PropTypes.string,
    important: PropTypes.bool,
    done: PropTypes.bool,
    readOnly: PropTypes.bool,
    onToggleDone: PropTypes.func,
    onDeleted: PropTypes.func,
    date: PropTypes.instanceOf(Date),
  };

  render() {
    const { label, important, done, readOnly, onToggleDone, onDeleted } =
      this.props;
    let classNames = "task__description";
    if (done) {
      classNames += " done";
    }

    if (important) {
      classNames += " important";
    }

    return (
      <li className="task">
        <div className="task__view">
          <input
            onClick={onToggleDone}
            className="task__toggle"
            type="checkbox"
            defaultChecked={done}
          />
          <label>
            <input
              readOnly={readOnly}
              value={label}
              type="text"
              className={classNames}
            />
            <span className="task__created">
              {formatDistanceToNow(this.props.date)}
            </span>
          </label>
          <button
            onClick={this.onMark}
            className="icon task__icon-edit"
          ></button>
          <button
            onClick={onDeleted}
            className="icon task__icon-destroy"
          ></button>
        </div>
      </li>
    );
  }
}

export default Task;

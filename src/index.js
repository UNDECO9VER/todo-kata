import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import Footer from "./components/Footer/Footer";
import "./index.css";
import TaskList from "./components/TaskList/TaskList";

const root = ReactDOM.createRoot(document.getElementById("root"));

class App extends Component {
  maxId = 1;

  state = {
    todoData: [],
    filter: "all",
  };

  createItem = (label) => {
    return {
      label,
      important: false,
      done: false,
      readOnly: true,
      id: this.maxId++,
      date: new Date(),
    };
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      console.log(index);
      return {
        todoData: todoData.filter((el, ind) => index !== ind),
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createItem(text);
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newArray = [...todoData];
      const newItem = { ...oldItem, done: !oldItem.done };
      newArray[index] = newItem;
      return {
        todoData: newArray,
      };
    });
  };

  setFilter = (filter) => {
    this.setState({
      filter: filter,
    });
  };

  render() {
    console.log(this.state.todoData);
    const taskCount = this.state.todoData.filter(
      (el) => el.done !== true
    ).length;
    return (
      <section style={{ maxWidth: "550px", background: "#fff" }}>
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          todos={this.state.todoData}
          filter={this.state.filter}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
        />
        <Footer
          setFilter={this.setFilter}
          taskCount={taskCount}
          deleteItem={this.deleteItem}
          todos={this.state.todoData}
        />
      </section>
    );
  }
}

root.render(<App />);

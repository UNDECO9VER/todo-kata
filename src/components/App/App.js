import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import './App.css'

class App extends Component {
  state = {
    todoData: [],
    filter: 'all',
  }
  
  createItem = (label) => {
    return {
      id: uuidv4(),
      date: new Date(),
      label,
      done: false,
    }
  }
  
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => el.id !== id),
      }
    })
  }

  editItem = (id, text) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newArray = [...todoData]
      const newItem = { ...oldItem, label: text }
      newArray[index] = newItem
      return {
        todoData: newArray,
      }
    })
  }
  
  deleteCompleted = ()=>{
    for (let i of this.state.todoData) {
      if (i.done) {
        this.deleteItem(i.id)
      }
    }
  }
  
  addItem = (text) => {
    const newItem = this.createItem(text)
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      }
    })
  }
  
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newArray = [...todoData]
      const newItem = { ...oldItem, done: !oldItem.done }
      newArray[index] = newItem
      return {
        todoData: newArray,
      }
    })
  }
  
  setFilter = (filter) => {
    this.setState({
      filter: filter,
    })
  }
  
  render() {
    const taskCount = this.state.todoData.filter(
      (el) => el.done !== true
    ).length
    return (
      <div>
        <h1>todos</h1>
        <section className='todoapp'>
          <NewTaskForm addItem={this.addItem} />
          <TaskList
            todos={this.state.todoData}
            filter={this.state.filter}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            editItem={this.editItem}
          />
          <Footer
            setFilter={this.setFilter}
            taskCount={taskCount}
            deleteItem={this.deleteItem}
            deleteCompleted={this.deleteCompleted}
            todos={this.state.todoData}
          />
        </section>
      </div>
    )
  }
}

export default App
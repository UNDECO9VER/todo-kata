import { Component } from 'react'
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
  
  createItem = (label, time) => {
    return {
      id: uuidv4(),
      date: new Date(),
      time,
      label,
      done: false,
      timeOut: null
    }
  }
  
  deleteItem = (id) => {
    this.stopTimer(id)
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => el.id !== id)
      }
    })
  }

  startTimer = (id) => {
    this.stopTimer(id)
    this.setState(({todoData})=>{
      const index = todoData.findIndex((el) => el.id === id)
      return{
        todoData: todoData.map((el,ind)=> ind === index ? { ...el, timeOut: setInterval(()=>{
          this.setState(({ todoData }) => {
            let time = todoData[index].time
            if(todoData[index].time > 0){
              return {
                todoData: todoData.map((el,ind)=> ind === index ? { ...el, time: --time } : el)
              }
            }else this.stopTimer(id)
          })
        }, 1000) } : el)
      }
    })
  }
  
  stopTimer = (id) => {
    this.setState(({todoData})=>{
      const index = todoData.findIndex((el) => el.id === id)
      return{
        todoData: todoData.map((el,ind)=> ind === index ? { ...el, timeOut: clearInterval(todoData[index].timeOut) } : el)
      }
    })
  }

  editItem = (id, text) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      return {
        todoData: todoData.map((el,ind)=> ind === index ? { ...el, label: text } : el)
      }
    })
  }

  stopCompleted(){
    for(let i in this.state.todoData){
      if(this.state.todoData[i].done){
        this.stopTimer(i)
      }
    }
  }
  
  deleteCompleted = ()=>{
    this.stopCompleted()
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => el.done === false)
      }
    })
  }
  
  addItem = (text, time) => {
    const newItem = this.createItem(text, time)
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem]
      }
    })
  }
  
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      return {
        todoData: todoData.map((el,ind)=> ind === index ? { ...el, done: !el.done } : el),
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
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
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
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import './App.css'

const App = () => {

  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')

  
  const createItem = (label, time) => {
    return {
      id: uuidv4(),
      date: new Date(),
      time,
      label,
      done: false
    }
  }
  
  const deleteItem = (id) => {
    setTodoData((data)=> data.filter((el) => el.id !== id))
  }

  const editTime = (id, time) => {
    setTodoData((data)=> data.map((el)=> el.id === id ? { ...el, time: time } : el))
  }

  const editItem = (id, text) => {
    setTodoData((data)=> data.map((el)=> el.id === id ? { ...el, label: text } : el))
  }
 
  const deleteCompleted = ()=>{
    setTodoData((data)=> data.filter((el) => el.done === false))
  }
  
  const addItem = (text, time) => {
    setTodoData((data)=> [...data, createItem(text, time)])
  }
  
  const onToggleDone = (id) => {
    setTodoData((data)=> data.map((el)=> el.id === id ? { ...el, done: !el.done } : el))
  }
  
  const setTodoFilter = (filter) => {
    setFilter(filter)
  }

  const taskCount = todoData.filter(
    (el) => el.done !== true
  ).length
  return (
    <div>
      <h1>todos</h1>
      <section className='todoapp'>
        <NewTaskForm addItem={addItem} />
        <TaskList
          todos={todoData}
          filter={filter}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          editItem={editItem}
          editTime={editTime}
        />
        <Footer
          setFilter={setTodoFilter}
          taskCount={taskCount}
          deleteItem={deleteItem}
          deleteCompleted={deleteCompleted}
          todos={todoData}
        />
      </section>
    </div>
  )
}

export default App
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './Task.css'

const Task = ({time, label, done, onToggleDone, onDeleted, id, editItem, editTime, date}) => {

  const[labelLocal, setLabelLocal] = useState(label)
  const[isEdit, setIsEdit] = useState(false)
  const[isDoneId] = useState(uuidv4())
  const[, setTimer] = useState(null)
  // let timer = null

  Task.defaultProps = {
    label: '',
    done: false,
    onToggleDone: () => {},
    onDeleted: () => {},
    date: new Date(),
  }

  Task.propTypes = {
    label: PropTypes.string,
    done: PropTypes.bool,
    onToggleDone: PropTypes.func,
    onDeleted: PropTypes.func,
    date: PropTypes.instanceOf(Date),
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(labelLocal.trim() !== ''){
      editItem( id, labelLocal.trim() )
      if(isEdit) setEdit()
    }else{
      onDeleted(id)
    }
  }

  const stopTimer = () => {
    setTimer((tm)=> clearTimeout(tm))
  }

  const startTimer = () =>{
    stopTimer()
    setTimer( 
      setInterval(()=>{
        if (time > 0 && !done) {
          editTime(id, --time)
        }else{
          stopTimer()
        } 
      }, 1000)
    )
  }

  const setEdit = () => {
    setIsEdit((e)=> !e)
  }

  const numberToTime = (num) => {
    const minutes = Math.trunc(num / 60)
    const seconds = num % 60
    return (minutes < 10 ? `0${minutes}`: minutes)  
    +':'+  (seconds < 10 ? `0${seconds}`: seconds)
  }

  const taskDone=()=>{
    stopTimer()
    onToggleDone()
  }

  useEffect(() => {
    return () => stopTimer()
  },[])
  

  let classNames = 'task__description'
  done ? classNames += ' done' : classNames 
  let classTaskInput = 'task__edit'
  let classTaskView = 'task__view'

  if (isEdit) {
    classTaskInput += ' edit'
    classTaskView += ' edit'
  }

  return (
    <li className="task">
      <div className={classTaskView}>
        <input
          id={isDoneId}
          onChange  = {taskDone}
          className="task__toggle"
          type="checkbox"
          defaultChecked={done}
        />
        <div className='task__container'>
          <label htmlFor={isDoneId} className={classNames}>
            {label}
          </label>
          <span className="task__timer">
            <button onClick={startTimer} className="task__icon-play"></button>
            <button onClick={stopTimer} className="task__icon-pause"></button>
            <span>{numberToTime(time)}</span> 
          </span>
          <span className="task__created">
            {formatDistanceToNow(date)}
          </span>
        </div>
        <label
          onClick={setEdit}
          className="icon task__icon-edit"
          htmlFor={id}
        ></label>
        <button
          onClick={onDeleted}
          className="icon task__icon-destroy"
        ></button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id={id}
          onBlur={onSubmit}
          onChange={(e)=> setLabelLocal(e.target.value)}
          value={labelLocal}
          type="text"
          className={classTaskInput}
        />
      </form>
    </li>
  )
}

export default Task

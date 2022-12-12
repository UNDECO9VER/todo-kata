import { useState , useEffect } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'


const NewTaskForm = ({addItem}) => {
  NewTaskForm.defaultProps = {
    addItem: '',
  }

  NewTaskForm.propTypes = {
    addItem: PropTypes.func,
  }

  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [time, setTime] = useState(0)

  const calcTime = () =>{
    const localMinutes = Number(minutes) ? Number(minutes) : 0
    const localSeconds = Number(seconds) ? Number(seconds) : 0
    
    return Number(localMinutes) * 60 + Number(localSeconds)
    
  }

  useEffect(()=>{
    setTime(calcTime())
  },[minutes, seconds])

  const onSubmit = (e) => {
    e.preventDefault()
    if(label.trim() !== ''){
      addItem(label.trim(), time )
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <form className='new-task-form' onSubmit={onSubmit}>
      <input
        required
        onChange={(e) => setLabel(e.target.value)}
        className="new-task-form__input"
        placeholder="What needs to be done?"
        value={label}
      />
      <input
        min={0}
        max={60}
        type='number'
        onChange={(e) => setMinutes(e.target.value)}
        className="new-task-form__input"
        placeholder="Min"
        value={minutes}
      />
      <input
        min={0}
        max={60}
        type='number'
        onChange={(e) => setSeconds(e.target.value)}
        className="new-task-form__input"
        placeholder="Sec"
        value={seconds}
      />
      <input
        className='new-task-form__submit'
        type='submit'
      />
    </form>
  )
}

export default NewTaskForm

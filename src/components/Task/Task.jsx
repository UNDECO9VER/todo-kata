import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import './Task.css'

class Task extends Component {
  state = {
    label: this.props.label,
    isEdit: false,
    isDoneId: uuidv4(),
    timeOut: null
  }

  static defaultProps = {
    label: '',
    done: false,
    onToggleDone: () => {},
    onDeleted: () => {},
    date: new Date(),
  }

  static propTypes = {
    label: PropTypes.string,
    done: PropTypes.bool,
    onToggleDone: PropTypes.func,
    onDeleted: PropTypes.func,
    date: PropTypes.instanceOf(Date),
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if(this.state.label.trim() !== ''){
      this.props.editItem( this.props.id, this.state.label.trim() )
      if(this.state.isEdit) this.setEdit()
    }else{
      this.props.onDeleted(this.props.id)
    }
  }

  startTimer = () =>{
    this.stopTimer()
    this.setState(()=>{
      return{
        timeOut: setInterval(()=>{
          let time = this.props.time
          if (time > 0 && !this.props.done) {
            this.props.editTime(this.props.id, --time)
          }else this.stopTimer()
        }, 1000)
      }
    })
  }

  stopTimer = () => {
    clearInterval(this.state.timeOut)
  }

  setEdit = () => {
    this.setState({isEdit:!this.state.isEdit})
  }

  numberToTime(num){
    const minutes = Math.trunc(num / 60)
    const seconds = num % 60
    return (minutes < 10 ? `0${minutes}`: minutes)  
    +':'+  (seconds < 10 ? `0${seconds}`: seconds)
  }

  componentWillUnmount(){
    this.stopTimer()
  }

  render() {
    const {time, label, done, onToggleDone, onDeleted, id} =
      this.props
    let classNames = 'task__description'
    done ? classNames += ' done' : classNames 
    let classTaskInput = 'task__edit'
    let classTaskView = 'task__view'

    if (this.state.isEdit) {
      classTaskInput += ' edit'
      classTaskView += ' edit'
    }

    return (
      <li className="task">
        <div className={classTaskView}>
          <input
            id={this.state.isDoneId}
            onChange  ={onToggleDone}
            className="task__toggle"
            type="checkbox"
            defaultChecked={done}
          />
          <div className='task__container'>
            <label htmlFor={this.state.isDoneId} className={classNames}>
              {label}
            </label>
            <span className="task__timer">
              <button onClick={this.startTimer} className="task__icon-play"></button>
              <button onClick={this.stopTimer} className="task__icon-pause"></button>
              <span>{this.numberToTime(time)}</span> 
            </span>
            <span className="task__created">
              {formatDistanceToNow(this.props.date)}
            </span>
          </div>
          <label
            onClick={this.setEdit}
            className="icon task__icon-edit"
            htmlFor={id}
          ></label>
          <button
            onClick={onDeleted}
            className="icon task__icon-destroy"
          ></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id={id}
            onBlur={this.onSubmit}
            onChange={(e)=> this.onLabelChange(e)}
            value={this.state.label}
            type="text"
            className={classTaskInput}
          />
        </form>
      </li>
    )
  }
}

export default Task

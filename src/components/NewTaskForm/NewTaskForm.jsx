import { Component } from 'react'
import PropTypes from 'prop-types'
// import { format, parseISO } from 'date-fns'
import './NewTaskForm.css'

class NewTaskForm extends Component {
  static defaultProps = {
    addItem: '',
  }

  static propTypes = {
    addItem: PropTypes.func,
  }

  state = {
    label: '',
    minutes: '',
    seconds: '',
    time: 0
  }

  setTime(){
    const minutes = Number(this.state.minutes) ? Number(this.state.minutes) : 0
    const seconds = Number(this.state.seconds) ? Number(this.state.seconds) : 0
    this.setState({
      time: Number(minutes) * 60 + Number(seconds)
    })
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    })
  }

  componentDidUpdate(prevP, prevS){
    if (prevS.minutes !== this.state.minutes || prevS.seconds !== this.state.seconds) {
      this.setTime()
    }
  }

  onSecondsChange = (e) => {
    this.setState({
      seconds: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if(this.state.label.trim() !== ''){
      this.props.addItem(this.state.label.trim(), this.state.time )
      this.setState({
        label: '',
        minutes: '',
        seconds: ''
      })
    }
  }

  render() {
    return (
      <form className='new-task-form' onSubmit={this.onSubmit}>
        <input
          required
          onChange={this.onLabelChange}
          className="new-task-form__input"
          placeholder="What needs to be done?"
          value={this.state.label}
        />
        <input
          min={0}
          max={60}
          type='number'
          onChange={this.onMinutesChange}
          className="new-task-form__input"
          placeholder="Min"
          value={this.state.minutes}
        />
        <input
          min={0}
          max={60}
          type='number'
          onChange={this.onSecondsChange}
          className="new-task-form__input"
          placeholder="Sec"
          value={this.state.seconds}
        />
        <input
          className='new-task-form__submit'
          type='submit'
        />
      </form>
    )
  }
}

export default NewTaskForm

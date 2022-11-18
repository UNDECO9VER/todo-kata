import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'

class Task extends Component {
  state = {
    label: this.props.label,
    isEdit: false
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

  setEdit = () => {
    this.setState({isEdit:!this.state.isEdit})
  }

  render() {
    const { label, done, onToggleDone, onDeleted, id} =
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
            onClick={onToggleDone}
            className="task__toggle"
            type="checkbox"
            defaultChecked={done}
          />
          <label>
            <span className={classNames}>
              {label}
            </span>
            <span className="task__created">
              {formatDistanceToNow(this.props.date)}
            </span>
          </label>
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

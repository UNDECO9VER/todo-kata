import { Component } from 'react'
import PropTypes from 'prop-types'
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
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if(this.state.label.trim() !== ''){
      this.props.addItem(this.state.label.trim())
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onLabelChange}
          className="new-task-form"
          placeholder="What needs to be done?"
          value={this.state.label}
          autoFocus=""
        />
      </form>
    )
  }
}

export default NewTaskForm

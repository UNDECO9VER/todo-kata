import { Component } from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.css'

class TaskFilter extends Component {
  state ={
    filter: ['All', 'Active', 'Completed']
  }
  static defaultProps = {
    setFilter: () => {},
  }

  static propTypes = {
    setFilter: PropTypes.func,
  }
  render() {
    const { setFilter } = this.props
    return (
      <ul className="task-filer">
        {
          this.state.filter.map((item)=>{
            return(
              <li key={item}>
                <button className='sidebar__label' onClick={(e) => setFilter(e.target.value)} value={item.toLocaleLowerCase()}>{item}</button>
              </li>
            ) 
          })
        }
      </ul>
    )
  }
}

export default TaskFilter

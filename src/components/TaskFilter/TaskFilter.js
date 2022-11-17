import React, { Component } from 'react'
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
        {/* <input defaultChecked id='all' type="radio" name='filter' value='all' onChange={(e) => setFilter(e.target.value)}/>
          <label htmlFor="all" className="sidebar__label">All</label> */}
        {/* <li>
          <input id='active' type="radio" name='filter' value='active' onChange={(e) => setFilter(e.target.value)}/>
          <label htmlFor="active" className="sidebar__label">Active</label>
        </li>
        <li>
          <input id='completed' type="radio" name='filter' value='completed' onChange={(e) => setFilter(e.target.value)}/>
          <label htmlFor="completed" className="sidebar__label">Completed</label>
        </li> */}
      </ul>
    )
  }
}

export default TaskFilter

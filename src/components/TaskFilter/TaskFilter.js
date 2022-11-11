import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.css'

class TaskFilter extends Component {
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
        <li>
          <input id='all' type="radio" name='filter' onClick={() => setFilter('all')}/>
          <label htmlFor="all" className="sidebar__label">All</label>
        </li>
        <li>
          <input id='active' type="radio" name='filter' onClick={() => setFilter('active')}/>
          <label htmlFor="active" className="sidebar__label">Active</label>
        </li>
        <li>
          <input id='completed' type="radio" name='filter' onClick={() => setFilter('completed')}/>
          <label htmlFor="completed" className="sidebar__label">Completed</label>
        </li>
      </ul>
    )
  }
}

// const TaskFilter = (props) => {
//   return (
//     <ul className="task-filer">
//       <li>
//         <button className="selected">All</button>
//       </li>
//       <li>
//         <button>Active</button>
//       </li>
//       <li>
//         <button>Completed</button>
//       </li>
//     </ul>
//   );
// };

export default TaskFilter

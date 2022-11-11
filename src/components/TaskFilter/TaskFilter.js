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
          <button onClick={() => setFilter('all')}>All</button>
        </li>
        <li>
          <button onClick={() => setFilter('active')}>Active</button>
        </li>
        <li>
          <button onClick={() => setFilter('completed')}>Completed</button>
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

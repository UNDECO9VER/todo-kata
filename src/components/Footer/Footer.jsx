import PropTypes from 'prop-types'

import TaskFilter from '../TaskFilter/TaskFilter'
import './Footer.css'

const Footer = ({ setFilter, taskCount, deleteCompleted}) => {
  Footer.propTypes = {
    setFilter: PropTypes.func,
    taskCount: PropTypes.number,
    deleteCompleted: PropTypes.func,
  }

  Footer.defaultProps = {
    setFilter: () => {},
    taskCount: 0,
    deleteCompleted: () => {},
  }

  return (
    <footer className="footer">
      <span className="todo-count">{taskCount} items left</span>
      <TaskFilter setFilter={setFilter} />
      <button
        onClick={deleteCompleted}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

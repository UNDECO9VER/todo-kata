import PropTypes from 'prop-types'

import Task from '../Task/Task.jsx'
import './TaskList.css'

const TaskList = ({ todos, filter, onDeleted, onToggleDone, 
  editItem, editTime }) => {
  const getVisibleTodos = (arr, filter) => {
    switch (filter) {
    case 'all':
      return arr
    case 'completed':
      return arr.filter((t) => t.done)
    case 'active':
      return arr.filter((t) => !t.done)
    }
  }

  TaskList.defaultProps = {
    todos: [],
    filter: 'all',
    onDeleted: () => {},
    onToggleDone: () => {},
  }

  TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
  }

  return (
    <ul className="task-list">
      {getVisibleTodos(todos, filter).map((item) => {
        const { id, ...itemProps } = item
        return <Task key={id} id={id} 
          onToggleDone={() => onToggleDone(id)} 
          onDeleted={() => onDeleted(id)}
          editItem={editItem}
          editTime={editTime}
          {...itemProps} />
      })}
    </ul>
  )
}

export default TaskList

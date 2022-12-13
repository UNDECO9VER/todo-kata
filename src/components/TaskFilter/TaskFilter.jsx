import PropTypes from 'prop-types'
import './TaskFilter.css'

const TaskFilter = ({setFilter}) => {
  const filter = ['All', 'Active', 'Completed']

  TaskFilter.defaultProps = {
    setFilter: () => {},
  }

  TaskFilter.propTypes = {
    setFilter: PropTypes.func,
  }

  return (
    <ul className="task-filer">
      {
        filter.map((item)=>{
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

export default TaskFilter

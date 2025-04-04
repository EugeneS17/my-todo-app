import { useReducer, useState } from 'react'

import './App.css'
import NewTaskForm from './components/NewTaskForm'
import { TaskList } from './components/TaskList'
import { Footer } from './components/Footer'
import { TasksFilter } from './components/TasksFilter'
import { Header } from './components/Header'
import tasksReducer from './services/reducers/tasksReducer'

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, [])
  const [filter, setFilter] = useState('all')

  const createTask = (title, deadline) => dispatch({ type: 'added', title, deadline })
  const deleteTask = (id) => dispatch({ type: 'deleted', id })
  const toggleTask = (id) => dispatch({ type: 'toggled', id })
  const updateTask = (id, title, deadline, isActive) => dispatch({ type: 'updated', id, title, deadline, isActive })
  const clearCompleted = () => dispatch({ type: 'cleared' })

  function filterTasks() {
    switch (filter) {
      // eslint-disable-next-line indent
      case 'active':
        return tasks.filter((task) => !task.completed)
      case 'completed':
        return tasks.filter((task) => task.completed)

      default:
        return tasks
    }
  }

  const filteredTasks = filterTasks()
  const remainingTasks = tasks.filter((task) => !task.completed)

  return (
    <div className="todoapp">
      <Header title="todos">
      <NewTaskForm onAddTask={createTask} min={5} sec={0} />
      </Header>
      <main className="main">
        <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} onUpdate={updateTask} />
      </main>
      <Footer tasksNumber={remainingTasks.length} onClearCompleted={clearCompleted}>
        <TasksFilter filter={filter} onFilterChange={(f) => setFilter(f)} />
      </Footer>
    </div>
  )
}

export default App

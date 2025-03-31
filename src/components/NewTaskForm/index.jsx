import { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default function NewTaskForm({ onAddTask = () => {}, min = 0, sec = 0 }) {
  const [title, setTitle] = useState('')
  const [minutes, setMinutes] = useState(min)
  const [seconds, setSeconds] = useState(sec)

  const timer = minutes * 60 + seconds

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) return

    const deadline = Date.now() + timer * 1000
    onAddTask(title.trim(), deadline)
    setTitle('')
    setMinutes(min)
    setSeconds(sec)
  }

  const handleMinutes = (value) => {
    const numValue = Number(value)
    if (isNaN(numValue) || numValue > 43200 || numValue < 0) return
    setMinutes(numValue)
  }

  const handleSeconds = (value) => {
    const numValue = Number(value)
    if (isNaN(numValue) || numValue > 59 || numValue < 0) return
    setSeconds(numValue)
  }

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Task description"
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={(e) => handleMinutes(e.target.value)}
        min="0"
        max="43200"
        aria-label="Minutes"
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={(e) => handleSeconds(e.target.value)}
        min="0"
        max="59"
        aria-label="Seconds"
      />
      <button type="submit" aria-label="Add task" className="visually-hidden" />
    </form>
  )
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
  min: PropTypes.number,
  sec: PropTypes.number,
}

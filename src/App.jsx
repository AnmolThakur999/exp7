import { useEffect, useState } from 'react';
import TaskItem from './components/TaskItem.jsx';

const STORAGE_KEY = 'task-manager-tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (event) => {
    event.preventDefault();
    const trimmedText = inputValue.trim();
    if (!trimmedText) return;

    const newTask = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setInputValue('');
  };

  const handleToggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId, newText) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  const handleClearTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="app-shell">
      <div className="task-panel">
        <header className="task-header">
          <h1>Task Manager</h1>
          <p>Build your daily to-do list with clean React state management.</p>
        </header>

        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Add a new task"
            aria-label="Task input"
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>

        <div className="controls-row">
          <div className="filter-group">
            <button
              type="button"
              className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              type="button"
              className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClearTasks}
            disabled={tasks.length === 0}
          >
            Clear All
          </button>
        </div>

        <div className="task-summary">
          <span>{tasks.length} task{tasks.length === 1 ? '' : 's'}</span>
          <span>{filteredTasks.length} visible</span>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks available</p>
              <small>Start by creating a new task above.</small>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => handleToggleTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
                onEdit={(newText) => handleEditTask(task.id, newText)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

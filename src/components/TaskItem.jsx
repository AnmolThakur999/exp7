import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (!trimmedText) return;
    onEdit(trimmedText);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button
        type="button"
        className="toggle-icon"
        onClick={onToggle}
        aria-label="Toggle completion"
      >
        ✔
      </button>

      <div className="task-body">
        {isEditing ? (
          <div className="edit-row">
            <input
              className="edit-input"
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSave();
                }
              }}
            />
            <button type="button" className="btn btn-small" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <p className="task-text">{task.text}</p>
        )}
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="icon-btn"
          onClick={() => setIsEditing((value) => !value)}
          aria-label="Edit task"
        >
          ✎
        </button>
        <button type="button" className="icon-btn delete" onClick={onDelete} aria-label="Delete task">
          ❌
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

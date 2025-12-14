import { useState } from "react"

export default function TodoItem({
  todo,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onToggle,
  onPermanentlyDelete,
  onRestore,
  isTrashView,
  isCompletedView,
}) {
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onSave(editText)
    } else {
      onCancel()
    }
  }

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {!isTrashView && (
        <button onClick={onToggle} className={`checkbox ${todo.completed ? "checked" : ""}`}>
          {todo.completed ? "✓" : ""}
        </button>
      )}

      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSave()
              if (e.key === "Escape") onCancel()
            }}
          />
          <button onClick={handleSave} className="btn-save">
            Save
          </button>
          <button onClick={onCancel} className="btn-cancel-edit">
            ✕
          </button>
        </div>
      ) : (
        <span className={`todo-text ${todo.completed ? "strikethrough" : ""}`}>{todo.text}</span>
      )}

      {!isEditing && (
        <div className="todo-actions">
          {isTrashView ? (
            <>
              <button onClick={onRestore} className="btn-restore" title="Restore">
                ↩️
              </button>
              <button onClick={onPermanentlyDelete} className="btn-delete" title="Delete permanently">
                ✕
              </button>
            </>
          ) : (
            <>
              {!isCompletedView && (
                <button onClick={onEdit} className="btn-edit" title="Edit">
                  ✎
                </button>
              )}
              <button onClick={onDelete} className="btn-delete" title="Delete">
                ✕
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

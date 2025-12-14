import { useState } from "react"
import TodoItem from "./todo-item"

export default function TodoList({
  todos,
  onUpdateTodo,
  onDeleteTodo,
  onToggleTodo,
  onPermanentlyDeleteTodo,
  onRestoreTodo,
  isTrashView,
  isCompletedView,
}) {
  const [editingId, setEditingId] = useState(null)

  const sortedTodos = [...todos].sort((a, b) => {
    if (!isTrashView && a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  return (
    <div className="todos-list">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          onEdit={() => setEditingId(todo.id)}
          onSave={(newText) => {
            onUpdateTodo(todo.id, newText)
            setEditingId(null)
          }}
          onCancel={() => setEditingId(null)}
          onDelete={() => onDeleteTodo(todo.id)}
          onToggle={() => onToggleTodo(todo.id)}
          onPermanentlyDelete={() => onPermanentlyDeleteTodo(todo.id)}
          onRestore={() => onRestoreTodo(todo.id)}
          isTrashView={isTrashView}
          isCompletedView={isCompletedView}
        />
      ))}
    </div>
  )
}

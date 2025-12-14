import SearchBar from "./search-bar"
import TodoForm from "./todo-form"
import TodoList from "./todo-list"

export default function TodoContainer({
  todos,
  allTodos,
  groups,
  selectedGroupId,
  searchQuery,
  onSearchChange,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
  onToggleTodo,
  onPermanentlyDeleteTodo,
  onRestoreTodo,
  isTrashView,
  isCompletedView,
}) {
  const selectedGroup = groups.find((g) => g.id === selectedGroupId)

  let groupColor = "#3b82f6"
  let headerTitle = "🦋 All Todos"

  if (selectedGroupId === "completed") {
    groupColor = "#22c55e"
    headerTitle = "⭐ Completed Todos"
  } else if (selectedGroupId === "trash") {
    groupColor = "#6b7280"
    headerTitle = "🗑️ Trash"
  } else if (selectedGroup) {
    groupColor = selectedGroup.color
    headerTitle = selectedGroup.name
  }

  const completedCount = todos.filter((t) => t.completed).length
  const totalCount = todos.length

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div className="header-content">
          <h2 className="header-title">{headerTitle}</h2>
          <p className="header-stats">
            {isTrashView ? `${totalCount} items in trash` : `${completedCount} of ${totalCount} completed`}
          </p>
        </div>
        <div className="header-color" style={{ backgroundColor: groupColor }} />
      </div>

      <div className="header-search">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className="todo-content">
        <div className="todo-wrapper">
          {!isTrashView && !isCompletedView && <TodoForm onAddTodo={onAddTodo} groupColor={groupColor} />}

          <div className="todo-list-wrapper">
            {todos.length === 0 ? (
              <div className="empty-state">
                <p>
                  {searchQuery
                    ? "🔍 No items found matching your search"
                    : isTrashView
                      ? "🗑 Trash is empty"
                      : isCompletedView
                        ? "🦄 No completed todos yet"
                        : "🦄No todos yet. Create one to get started!"}
                </p>
              </div>
            ) : (
              <TodoList
                todos={todos}
                onUpdateTodo={onUpdateTodo}
                onDeleteTodo={onDeleteTodo}
                onToggleTodo={onToggleTodo}
                onPermanentlyDeleteTodo={onPermanentlyDeleteTodo}
                onRestoreTodo={onRestoreTodo}
                isTrashView={isTrashView}
                isCompletedView={isCompletedView}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

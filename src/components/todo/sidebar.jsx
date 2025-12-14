"use client"

import { useState } from "react"

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"]

export default function Sidebar({
  groups,
  selectedGroupId,
  onSelectGroup,
  onAddGroup,
  onDeleteGroup,
  completedCount,
  trashCount,
}) {
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupColor, setNewGroupColor] = useState(COLORS[0])

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      onAddGroup(newGroupName, newGroupColor)
      setNewGroupName("")
      setNewGroupColor(COLORS[0])
      setShowAddGroup(false)
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">🦄TODO_LIST</h1>
      </div>

      <div className="sidebar-groups">
        <button
          onClick={() => onSelectGroup("all")}
          className={`group-btn ${selectedGroupId === "all" ? "active" : ""}`}
        >
          🧚‍♀️ All Todos
        </button>

        <button
          onClick={() => onSelectGroup("completed")}
          className={`group-btn ${selectedGroupId === "completed" ? "active" : ""}`}
        >
          🌟 Completed {completedCount > 0 && `(${completedCount})`}
        </button>

        <button
          onClick={() => onSelectGroup("trash")}
          className={`group-btn ${selectedGroupId === "trash" ? "active" : ""}`}
        >
          🗑️ Trash {trashCount > 0 && `(${trashCount})`}
        </button>

        {groups.map((group) => (
          <div key={group.id} className="group-item">
            <button
              onClick={() => onSelectGroup(group.id)}
              className={`group-btn-colored ${selectedGroupId === group.id ? "active" : ""}`}
              style={{
                backgroundColor: selectedGroupId === group.id ? group.color : "transparent",
                borderLeft: `3px solid ${group.color}`,
              }}
            >
              {group.name}
            </button>
            {group.id !== "personal" && (
              <button onClick={() => onDeleteGroup(group.id)} className="delete-group-btn" title="Delete group">
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        {showAddGroup ? (
          <div className="add-group-form">
            <input
              type="text"
              placeholder="Group name..."
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="add-group-input"
              onKeyPress={(e) => {
                if (e.key === "Enter") handleAddGroup()
              }}
              autoFocus
            />
            <div className="color-picker">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setNewGroupColor(color)}
                  className={`color-btn ${newGroupColor === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  title="Select color"
                />
              ))}
            </div>
            <div className="add-group-actions">
              <button onClick={handleAddGroup} className="btn-add">
                Add
              </button>
              <button onClick={() => setShowAddGroup(false)} className="btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowAddGroup(true)} className="btn-new-group">
            + New Group
          </button>
        )}
      </div>
    </div>
  )
}

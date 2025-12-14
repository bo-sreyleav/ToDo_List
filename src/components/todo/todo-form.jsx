import { useState } from "react";

export default function TodoForm({ onAddTodo, groupColor }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        onAddTodo(input);
        setInput("");
        setIsLoading(false);
      }, 100);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        style={{ backgroundColor: groupColor }}
        className="btn-add-todo"
      >
        + Add
      </button>
    </form>
  );
}

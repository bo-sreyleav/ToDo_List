import { useState, useMemo } from "react";
import Sidebar from "@/components/todo/sidebar";
import TodoContainer from "@/components/todo/todo-container";

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: "1",
      text: "Java_Srcip_Section",
      completed: false,
      groupId: "Group_Froned",
      createdAt: new Date(),
    },
    {
      id: "2",
      text: "GitHup_Section",
      completed: false,
      groupId: "Group_Froned",
      createdAt: new Date(),
    },
    {
      id: "3",
      text: "Phthon_Section",
      completed: false,
      groupId: "Group_Froned",
      createdAt: new Date(),
    },
  ]);

  const [deletedTodos, setDeletedTodos] = useState([]);

  const [groups, setGroups] = useState([
    { id: "Group_Froned", name: "Group_Froned", color: "#ef4444" },
    { id: "Git_and_GitHub", name: "Git_and_GitHub", color: "#3b82f6" },
    { id: "Java_Srcip", name: "Java_Srcip", color: "#f59e0b" },
   
  ]);

  const [selectedGroupId, setSelectedGroupId] = useState("personal");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (selectedGroupId === "completed") {
      filtered = todos.filter((todo) => todo.completed);
    } else if (selectedGroupId === "trash") {
      return deletedTodos.filter(
        (todo) =>
          searchQuery === "" ||
          todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filtered = todos.filter((todo) => {
        const matchesGroup =
          selectedGroupId === "all" || todo.groupId === selectedGroupId;
        return matchesGroup;
      });
    }

    const matchesSearch =
      searchQuery === "" ||
      filtered.some((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return filtered.filter(
      (todo) =>
        searchQuery === "" ||
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [todos, deletedTodos, selectedGroupId, searchQuery]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      groupId:
        selectedGroupId !== "all" &&
        selectedGroupId !== "completed" &&
        selectedGroupId !== "trash"
          ? selectedGroupId
          : "personal",
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, text) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const deleteTodo = (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (todoToDelete) {
      setDeletedTodos([
        ...deletedTodos,
        { ...todoToDelete, deletedAt: new Date() },
      ]);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const permanentlyDeleteTodo = (id) => {
    setDeletedTodos(deletedTodos.filter((todo) => todo.id !== id));
  };

  const restoreTodo = (id) => {
    const todoToRestore = deletedTodos.find((todo) => todo.id === id);
    if (todoToRestore) {
      const { deletedAt, ...restored } = todoToRestore;
      setTodos([...todos, restored]);
      setDeletedTodos(deletedTodos.filter((todo) => todo.id !== id));
      setSelectedGroupId(restored.groupId);
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addGroup = (name, color) => {
    const newGroup = {
      id: Date.now().toString(),
      name,
      color,
    };
    setGroups([...groups, newGroup]);
  };

  const deleteGroup = (id) => {
    if (id !== "personal") {
      setGroups(groups.filter((group) => group.id !== id));
      setTodos(todos.filter((todo) => todo.groupId !== id));
      if (selectedGroupId === id) {
        setSelectedGroupId("personal");
      }
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        groups={groups}
        selectedGroupId={selectedGroupId}
        onSelectGroup={setSelectedGroupId}
        onAddGroup={addGroup}
        onDeleteGroup={deleteGroup}
        completedCount={todos.filter((t) => t.completed).length}
        trashCount={deletedTodos.length}
      />
      <TodoContainer
        todos={filteredTodos}
        allTodos={todos}
        groups={groups}
        selectedGroupId={selectedGroupId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddTodo={addTodo}
        onUpdateTodo={updateTodo}
        onDeleteTodo={deleteTodo}
        onToggleTodo={toggleTodo}
        onPermanentlyDeleteTodo={permanentlyDeleteTodo}
        onRestoreTodo={restoreTodo}
        isTrashView={selectedGroupId === "trash"}
        isCompletedView={selectedGroupId === "completed"}
      />
    </div>
  );
}

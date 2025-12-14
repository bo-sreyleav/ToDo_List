export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search todos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="search-clear"
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
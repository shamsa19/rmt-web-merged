// src/components/SearchInput.tsx
import React from "react";

interface SearchInputProps {
  /** Current input value */
  value: string;
  /** Called on every change with the new value */
  onChange: (newValue: string) => void;
  /** Placeholder text (optional) */
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search…",
}) => {
  return (
    <div className="search-input">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <span className="search-icon">🔍</span>
    </div>
  );
};

export default SearchInput;

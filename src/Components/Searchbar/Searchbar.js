import React, { useState } from "react";

export default function Searchbar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(search);
    }
  };

  const handleSearchClick = () => {
    onSearch(search);
  };

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Enter Your Book Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearchClick}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
}

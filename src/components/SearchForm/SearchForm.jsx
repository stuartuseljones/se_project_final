import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <form className="searchform" onSubmit={handleSubmit}>
      <input
        className="searchform__input"
        type="text"
        placeholder="Enter topic"
        value={keyword}
        onChange={handleInputChange}
      />
      <button className="searchform__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;

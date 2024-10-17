
import  { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for a destination..." 
        className="p-2 rounded bg-blue-100"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded ml-2">Search</button>
    </form>
  );
};

export default SearchBar;

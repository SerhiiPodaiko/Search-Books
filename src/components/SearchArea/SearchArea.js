import React from 'react';

const SearchArea = (props) => {
  return (
    <div className="search-area">
      <form onSubmit={props.searchBook}>
        <input type="text" onChange={props.handleSearch} />
        <button type="submit">Search</button>
        <select defaultValue="Sort" onChange={props.handleSort}>
          <option disabled value="Sort">Sort</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </form>
    </div>
  )
}

export default SearchArea;

import React from 'react';

const Search = ({ names }) => (
  <div className="names">
    {Object.keys(names).map(key => (
      <p className="name" key={key}>
        {key}
      </p>
    ))}
  </div>
);

export default Search;

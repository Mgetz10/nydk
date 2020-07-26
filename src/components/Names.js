import React from 'react';

const Names = ({ names }) => (
  <div className="names">
    {Object.keys(names).map(key => (
      <p className="name" key={key}>
        {key}
      </p>
    ))}
  </div>
);

export default Names;

// src/components/Tag.jsx
import React from 'react';
import '../css/Tag.css';

function Tag({ name }) {
  return (
    <span className="tag">
      {name}
    </span>
  );
}

export default Tag;

// src/components/Sidebar.jsx
import React from 'react';
import Tag from './Tag';
import '../css/Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Filters</h2>
      <div className="filter-group">
        <label><input type="checkbox" /> Dessert Type</label>
        <label><input type="checkbox" /> Directory</label>
        <label><input type="checkbox" /> Flower</label>
        <label><input type="checkbox" /> Distance</label>
        <label><input type="checkbox" /> Price</label>
        <label><input type="checkbox" /> Rating</label>
      </div>

      <h3>Example Tags:</h3>
      <div className="tag-container">
        <Tag name="Peanut-Free" />
        <Tag name="Dairy-Free" />
        <Tag name="Gluten-Free" />
      </div>

      <h3>Flavors:</h3>
      <div className="tag-container">
        <Tag name="Chocolate" />
        <Tag name="Vanilla" />
        <Tag name="Strawberry" />
      </div>
    </aside>
  );
}

export default Sidebar;

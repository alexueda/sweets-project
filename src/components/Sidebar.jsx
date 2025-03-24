// src/components/Sidebar.jsx
import React from 'react';
import Tag from './Tag';
import './Sidebar.css';

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

      <h2>Dessert Name</h2>
      <div className="dessert-card">
        <img
          src="https://via.placeholder.com/80"
          alt="Dessert"
          className="dessert-image"
        />
        <div className="dessert-info">
          <h3>Sample Dessert</h3>
          <p>Rating: ★★★★☆</p>
          <p>Rank: #1 in Provo</p>
        </div>
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

// src/components/MainContent.jsx
import React from 'react';
import mapImage from '../assets/map-placeholder.png';
import FilteredCards from './FilteredCards';
import '../css/MainContent.css';

function MainContent({ searchQuery }) {
  return (
    <main className="main-content">
      <div className="card-container">
        <FilteredCards />
      </div>
      <div className="map-container">
        <h2>Map of Sweets in Provo, UT</h2>
        <img src={mapImage} alt="Map of Sweets in Provo" className="map-image" />
      </div>
      {searchQuery && (
        <div className="search-result">
          <h3>Search Results for: "{searchQuery}"</h3>
          <p>No results found yet.</p>
        </div>
      )}
    </main>
  );
}

export default MainContent;

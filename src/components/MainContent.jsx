// src/components/MainContent.jsx
import React from 'react';
import OpenStreetMap from './OpenStreetMap';
import FilteredCards from './FilteredCards';
import '../css/MainContent.css';

function MainContent({ searchQuery }) {
  return (
    <main className="main-content">
      <div className="card-container">
        <FilteredCards searchQuery={searchQuery} />
      </div>
      <div className="map-container">
        <h2>Map of Sweets in Provo, UT</h2>
        <OpenStreetMap/>
      </div>
    </main>
  );
}

export default MainContent;

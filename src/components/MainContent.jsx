// src/components/MainContent.jsx
import React, {useState} from 'react';
import OpenStreetMap from './OpenStreetMap';
import FilteredCards from './FilteredCards'
import '../css/MainContent.css';
import DessertCard from './DessertCard';

function MainContent({ 
  searchQuery, 
  selectedFlavor, 
  selectedType,
  selectedDietary,
  selectedRating
}) {
 
  return (
    <main className="main-content">
      <div className="card-container">
        <DessertCard
          selectedFlavor={selectedFlavor}
          selectedDessertType={selectedType}
          selectedDietary={selectedDietary}
          selectedRating={selectedRating}
          searchQuery={searchQuery} 
          />
      </div>
      <div className="map-container">
        <h2>Map of Sweets in Provo, UT</h2>
        <OpenStreetMap/>
      </div>
    </main>
  );
}

export default MainContent;

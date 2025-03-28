// src/components/MainContent.jsx
import React, {useState} from 'react';
import OpenStreetMap from './OpenStreetMap';
import FilteredCards from './FilteredCards';
import '../css/MainContent.css';

function MainContent({ searchQuery }) {
  const [selectedFlavor, setSelectedFlavor] = useState([]);

  console.log(selectedFlavor);

  return (
    <main className="main-content">
      <div className="card-container">
        <FilteredCards
          selectedFlavor={selectedFlavor}
          setSelectedFlavor={setSelectedFlavor}
        />
      </div>
      <div className="map-container">
        <h2>Map of Sweets in Provo, UT</h2>
        <OpenStreetMap/>
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

// src/components/Favorites.jsx
import React from 'react';
import {useNavigate} from 'react-router-dom';
import DessertCard from './DessertCard';  // Import your DessertCard component
import dessertData from '../contextsGlobal/dessertData'; // Import the dessert data
import '../css/personal.css'

const Personal = ({ selectedFlavor, selectedDessertType, selectedDietary, selectedRating, searchQuery }) => {
  const navigate = useNavigate();

  return (
    <div className="favorites-page">
      <div className="favorites-left">
        <h2>Your Favorite Desserts</h2>
        <DessertCard
          displayOnlyFavorites={true}  // Only show favorites
        />
      </div>

      <div className="favorites-right">
        <h2>Your Reviews</h2>
        {/* Display user reviews if needed, or leave this area empty for now */}
        <p>Here will be additional user reviews or other content if needed.</p>
      </div>
    </div>
  );
};

export default Personal;

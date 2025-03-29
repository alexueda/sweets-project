// src/components/DessertCard.jsx
import React, { useState } from "react";
import "../css/dessertCard.css";
import dessertData from "../contextsGlobal/dessertData"; // Import the dessert data

const DessertCard = ({ searchQuery }) => {
  const [cards, setCards] = useState(dessertData); // Set dessertData as the initial state

  // Filter cards if a search query is provided (ignoring case)
  const displayedCards = searchQuery
    ? cards.filter(
        (card) =>
          card["dessert title"]
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          card["restaurant"].toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cards;

  return (
    <div className="card-generator">
      <div className="cards-container">
        {displayedCards.map((card) => (
          <div key={card["dessert title"]} className="card">
            <h3>{card["dessert title"]}</h3>
            <p><strong>Restaurant:</strong> {card["restaurant"]}</p>
            <p><strong>Flavor:</strong> {card["flavor"]}</p>
            <p><strong>Stars:</strong> {card["stars"]}</p>
            <p><strong>Deals:</strong> {card["deals"].join(", ")}</p>
            <p><strong>Dietary Friendly:</strong> {card["dietary friendly"].join(", ") || "None"}</p>
            {card["image"].length > 0 && <img src={card["image"][0]} alt={card["dessert title"]} />}
          </div>
        ))}
      </div>
      {searchQuery && displayedCards.length === 0 && (
        <div className="no-results">
          <h3>Search Results for: "{searchQuery}"</h3>
          <p>No results found.</p>
        </div>
      )}
    </div>
  );
};

export default DessertCard;

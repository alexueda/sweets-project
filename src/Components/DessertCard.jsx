// src/components/DessertCard.jsx
import React, { useState } from "react";
import "../css/dessertCard.css";

const DessertCard = ({ searchQuery }) => {
  const [cards, setCards] = useState([]);

  // Function to generate a random card (unchanged)
  const dessertCard = () => {
    const titles = [
      "Awesome Title",
      "Cool Design",
      "React Rocks",
      "Amazing Card",
      "Dynamic Content"
    ];
    const descriptions = [
      "This is a random description. You can add your custom content here!",
      "Keep building awesome stuff with React!",
      "This card is randomly generated, you can use it for anything!",
      "React makes UI development easy and fun.",
      "Start adding dynamic content to your app."
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDescription =
      descriptions[Math.floor(Math.random() * descriptions.length)];

    const newCard = {
      id: Date.now(), // Use timestamp as a unique ID
      title: randomTitle,
      description: randomDescription,
    };

    setCards((prevCards) => [...prevCards, newCard]); // Add new card to the cards state
  };

  // Filter cards if a search query is provided (ignoring case)
  const displayedCards = searchQuery
    ? cards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cards;

  return (
    <div className="card-generator">
      <button onClick={dessertCard}>Generate Card</button>
      <div className="cards-container">
        {displayedCards.map((card) => (
          <div key={card.id} className="card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
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

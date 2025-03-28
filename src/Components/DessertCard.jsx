/* Card generator for individual dessert cards
   Pulls from dessert object information */

import React, { useState } from "react";
import "../css/dessertCard.css"

const DessertCard = () => {
    const [cards, setCards] = useState([]);

    // Function to generate a random card
    const dessertCard = () => {
    const titles = ["Awesome Title", "Cool Design", "React Rocks", "Amazing Card", "Dynamic Content"];
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

    return (
    <div className="card-generator">
        
        <div className="cards-container">
        {cards.map((card) => (
            <div key={card.id} className="card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            </div>
        ))}
        </div>
    </div>
    );
};

export default DessertCard;

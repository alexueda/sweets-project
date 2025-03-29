// src/components/DessertCard.jsx
import React, { useState } from "react";
import "../css/dessertCard.css";
import dessertData from "../contextsGlobal/dessertData"; // Import the dessert data

const DessertCard = ({ selectedFlavor, selectedDessert, selectedDietary, searchQuery }) => {
  const [desserts, setDesserts] = useState(dessertData); // Set dessertData as the initial state

  // Filter cards if a search query is provided (ignoring case)
  const displayedDesserts = searchQuery
  ? desserts.filter((dessert) =>
      // First part: search query logic
      (
        dessert["dessert title"]
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        dessert["restaurant"].toLowerCase().includes(searchQuery.toLowerCase()) ||
        dessert["flavor"].some((flavor) =>
          flavor.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        dessert["dessert type"].toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      // Second part: selected filter logic
      (
        (
          selectedFlavor.length === 0 || // If no flavors are selected, include all desserts
          selectedFlavor.some((selected) =>
            dessert["flavor"].some((flavor) =>
              flavor.toLowerCase().includes(selected.toLowerCase())
            )
          )
        ) && 
        (
          selectedDessert.length === 0 || // If no flavors are selected, include all desserts
          selectedDessert.some((selected) =>
            dessert["dessert type"].toLowerCase().includes(selected.toLowerCase())
          )
        ) &&
        (
          selectedDietary.length === 0 || // If no flavors are selected, include all desserts
          selectedDietary.some((selected) =>
            dessert["dietary friendly"].some((dietary) =>
              dietary.toLowerCase().includes(selected.toLowerCase())
            )
          )
        )
      )
    )
  : desserts.filter((dessert) =>
      // If no search query, just filter by selected flavors
      (selectedFlavor.length === 0 || // If no flavors are selected, include all desserts
      selectedFlavor.some((selected) =>
        dessert["flavor"].some((flavor) =>
          flavor.toLowerCase().includes(selected.toLowerCase())
        )
      )) &&
      (selectedDessert.length === 0 || // If no flavors are selected, include all desserts
        selectedDessert.some((selected) =>
          dessert["dessert type"].toLowerCase().includes(selected.toLowerCase()))
      ) &&
      (selectedDietary.length === 0 || 
        selectedDietary.some((selected) =>
          dessert["dietary friendly"].some((diet) =>
            diet.toLowerCase().includes(selected.toLowerCase())
          )
        ))
  );


  return (
    <div className="dessert-generator">
      <div className="dessert-container">
        {displayedDesserts.map((dessert) => (
          <div key={dessert["dessert title"]} className="dessert">
            <h3>{dessert["dessert title"]}</h3>
            <p><strong>Restaurant:</strong> {dessert["restaurant"]}</p>
            <p><strong>Flavor:</strong> {dessert["flavor"].join(", ")}</p>
            <p><strong>Stars:</strong> {dessert["stars"]}</p>
            <p><strong>Deals:</strong> {dessert["deals"].join(", ")}</p>
            <p><strong>Dietary Preferences:</strong> {dessert["dietary friendly"].join(", ") || "None"}</p>
            {dessert["image"].length > 0 && <img src={dessert["image"][0]} alt={dessert["dessert title"]} />}
          </div>
        ))}
      </div>
      {searchQuery && displayedDesserts.length === 0 && (
        <div className="no-results">
          <h3>Search Results for: "{searchQuery}"</h3>
          <p>No results found.</p>
        </div>
      )}
    </div>
  );
};

export default DessertCard;

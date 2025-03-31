import React, { useState } from "react";
import "../css/dessertCard.css";
import dessertData from "../contextsGlobal/dessertData"; // Import the dessert data
import RenderStars from "./Stars";
import DessertModal from "./DessertModal";

const DessertCard = ({ selectedFlavor, selectedDessertType, selectedDietary, searchQuery }) => {
  const [selectedDessertCard, setSelectedDessertCard] = useState(null); // Store clicked dessert
  const [desserts, setDesserts] = useState(dessertData); // Use state to manage the dessert data

  const handleAddReview = (dessertToUpdate, newReviewText) => {
    const updatedDesserts = desserts.map((dessert) => {
      if (dessert["dessert title"] === dessertToUpdate["dessert title"]) {
        return { ...dessert, reviews: [...dessert.reviews, newReviewText] };
      }
      return dessert;
    });
    setDesserts(updatedDesserts);
    setSelectedDessertCard(updatedDesserts.find(d => d["dessert title"] === dessertToUpdate["dessert title"])); // Update modal content
  };

  // Filter cards if a search query is provided (ignoring case)
  const displayedDesserts = searchQuery
    ? desserts.filter((dessert) =>
        // ... (rest of your filtering logic remains the same, but now using the 'desserts' state)
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
        (
          (selectedFlavor.length === 0 || selectedFlavor.some((selected) =>
            dessert["flavor"].some((flavor) =>
              flavor.toLowerCase().includes(selected.toLowerCase())
            )
          )) &&
          (selectedDessertType.length === 0 || selectedDessertType.some((selected) =>
            dessert["dessert type"].toLowerCase().includes(selected.toLowerCase())
          )) &&
          (selectedDietary.length === 0 || selectedDietary.some((selected) =>
            dessert["dietary friendly"].some((dietary) =>
              dietary.toLowerCase().includes(selected.toLowerCase())
            )
          ))
        )
      )
    : desserts.filter((dessert) =>
        (selectedFlavor.length === 0 || selectedFlavor.some((selected) =>
          dessert["flavor"].some((flavor) =>
            flavor.toLowerCase().includes(selected.toLowerCase())
          )
        )) &&
        (selectedDessertType.length === 0 || selectedDessertType.some((selected) =>
          dessert["dessert type"].toLowerCase().includes(selected.toLowerCase())
        )) &&
        (selectedDietary.length === 0 || selectedDietary.some((selected) =>
          dessert["dietary friendly"].some((diet) =>
            diet.toLowerCase().includes(selected.toLowerCase())
          )
        ))
      );

  return (
    <div className="dessert-generator">
      <div className="dessert-container">
        {displayedDesserts.map((dessert) => (
          <div key={dessert["dessert title"]} className="dessert" onClick={() => setSelectedDessertCard(dessert)}>
            <h3>{dessert["dessert title"]}</h3>
            <p>
              <RenderStars rating={dessert.stars} /> ({dessert.stars})
            </p>
            <p><strong>Restaurant:</strong> {dessert["restaurant"]}</p>
            <p><strong>Flavor:</strong> {dessert["flavor"].join(", ")}</p>
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

      {/* Modal for selected dessert */}
      {selectedDessertCard && (
        <DessertModal
          dessert={selectedDessertCard}
          onClose={() => setSelectedDessertCard(null)}
          onAddReview={handleAddReview} // Pass the review submission handler
        />
      )}
    </div>
  );
};

export default DessertCard;
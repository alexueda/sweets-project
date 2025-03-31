import React, { useState } from "react";
import "../css/dessertCard.css";
import dessertData from "../contextsGlobal/dessertData"; // Import the dessert data
import RenderStars from "./Stars";
import DessertModal from "./DessertModal";

const DessertCard = ({
  selectedFlavor,
  selectedDessertType,
  selectedDietary,
  selectedRating,
  searchQuery,
  displayOnlyFavorites,
}) => {
  const [selectedDessertCard, setSelectedDessertCard] = useState(null); // Store clicked dessert

  // Filter cards if a search query is provided (ignoring case)
  const displayedDesserts = displayOnlyFavorites
    ? dessertData.filter((dessert) => dessert.favorite === true) // Only show favorites if displayOnlyFavorites is true
    : searchQuery
    ? dessertData.filter((dessert) =>
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
          )) &&
          (selectedRating.length === 0 || selectedRating.some((selected) =>
            dessert["rating"].toLowerCase().includes(selected.toLowerCase())
          )) 
        )
      )
    : dessertData.filter((dessert) =>
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
        )) &&
        (selectedRating.length === 0 || selectedRating.some((selected) =>
          dessert["rating"].toLowerCase().includes(selected.toLowerCase())
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
        <DessertModal dessert={selectedDessertCard} onClose={() => setSelectedDessertCard(null)} />
      )}
    </div>
  );
};

export default DessertCard;

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
  const [selectedDessertCard, setSelectedDessertCard] = useState(null);
  const [desserts, setDesserts] = useState(dessertData);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sorting state: sortOption can be one of:
  // "default" | "alphabet-asc" | "alphabet-desc" | "stars-asc" | "stars-desc"
  const [sortOption, setSortOption] = useState("default");

  const handleAddReview = (dessertToUpdate, newReviewText) => {
    const updatedDesserts = desserts.map((dessert) => {
      if (dessert["dessert title"] === dessertToUpdate["dessert title"]) {
        return { ...dessert, reviews: [...dessert.reviews, newReviewText] };
      }
      return dessert;
    });
    setDesserts(updatedDesserts);
    setSelectedDessertCard(
      updatedDesserts.find(
        (d) => d["dessert title"] === dessertToUpdate["dessert title"]
      )
    );
  };

  // Filtering logic (kept as-is; replace dessertData with desserts if you want updates to persist)
  const displayedDesserts = displayOnlyFavorites
    ? dessertData.filter((dessert) => dessert.favorite === true)
    : searchQuery
    ? dessertData.filter((dessert) =>
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
          (selectedFlavor.length === 0 ||
            selectedFlavor.some((selected) =>
              dessert["flavor"].some((flavor) =>
                flavor.toLowerCase().includes(selected.toLowerCase())
              )
            )) &&
          (selectedDessertType.length === 0 ||
            selectedDessertType.some((selected) =>
              dessert["dessert type"].toLowerCase().includes(selected.toLowerCase())
            )) &&
          (selectedDietary.length === 0 ||
            selectedDietary.some((selected) =>
              dessert["dietary friendly"].some((dietary) =>
                dietary.toLowerCase().includes(selected.toLowerCase())
              )
            )) &&
          (selectedRating.length === 0 ||
            selectedRating.some((selected) =>
              Math.floor(dessert["stars"]) === selected
            ))
        )
      )
    : desserts.filter((dessert) =>
        (selectedFlavor.length === 0 ||
          selectedFlavor.some((selected) =>
            dessert["flavor"].some((flavor) =>
              flavor.toLowerCase().includes(selected.toLowerCase())
            )
          )) &&
        (selectedDessertType.length === 0 ||
          selectedDessertType.some((selected) =>
            dessert["dessert type"].toLowerCase().includes(selected.toLowerCase())
          )) &&
        (selectedDietary.length === 0 ||
          selectedDietary.some((selected) =>
            dessert["dietary friendly"].some((diet) =>
              diet.toLowerCase().includes(selected.toLowerCase())
            )
          )) &&
        (selectedRating.length === 0 ||
          selectedRating.some((selected) =>
            Math.floor(dessert["stars"]) === selected
          ))
      );

  // Apply sorting based on sortOption.
  const sortedDesserts = (() => {
    if (sortOption === "default") return displayedDesserts;
    const copy = [...displayedDesserts];
    if (sortOption === "alphabet-asc") {
      copy.sort((a, b) =>
        a["dessert title"].localeCompare(b["dessert title"])
      );
    } else if (sortOption === "alphabet-desc") {
      copy.sort((a, b) =>
        b["dessert title"].localeCompare(a["dessert title"])
      );
    } else if (sortOption === "stars-asc") {
      copy.sort((a, b) => a.stars - b.stars);
    } else if (sortOption === "stars-desc") {
      copy.sort((a, b) => b.stars - a.stars);
    }
    return copy;
  })();

  const toggleFavorite = (dessert) => {
    setIsFavorite((prev) => !prev);
    dessert["favorite"] = !dessert["favorite"];
  };

  return (
    <div className="dessert-generator">
      {/* Sort Bar in top-right corner */}
      <div className="sort-bar">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="alphabet-asc">Alphabet &#8593;</option>
          <option value="alphabet-desc">Alphabet &#8595;</option>
          <option value="stars-asc">Stars &#8593;</option>
          <option value="stars-desc">Stars &#8595;</option>
        </select>
      </div>

      <div className="dessert-container">
        {sortedDesserts.map((dessert) => (
          <div
            key={dessert["dessert title"]}
            className="dessert"
            onClick={() => setSelectedDessertCard(dessert)}
          >
            {dessert["image"] && (
              <img
                src={dessert["image"]}
                alt={dessert["dessert title"]}
              />
            )}
            <div className="dessert-info">
              <h3>{dessert["dessert title"]}</h3>
              <p>
                <RenderStars rating={dessert.stars} /> ({dessert.stars})
              </p>
              <p>
                <strong>{dessert["flavor"].join(", ")}</strong>
              </p>
              <p>
                <strong>Dietary Preferences:</strong>{" "}
                {dessert["dietary friendly"].join(", ") || "None"}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(dessert);
              }}
              className="fav-button"
            >
              <i
                className={`bi ${
                  dessert.favorite ? "bi-heart-fill" : "bi-heart"
                }`}
              ></i>
            </button>
          </div>
        ))}
      </div>

      {searchQuery && sortedDesserts.length === 0 && (
        <div className="no-results">
          <h3>Search Results for: "{searchQuery}"</h3>
          <p>No results found.</p>
        </div>
      )}

      {selectedDessertCard && (
        <DessertModal
          dessert={selectedDessertCard}
          onClose={() => setSelectedDessertCard(null)}
          onAddReview={handleAddReview}
        />
      )}
    </div>
  );
};

export default DessertCard;

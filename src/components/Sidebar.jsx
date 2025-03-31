// src/components/Sidebar.jsx
import React, { useState } from "react";
import Tag from './Tag';
import '../css/Sidebar.css';

export default function Sidebar({
  selectedFlavor,
  setSelectedFlavor,
  selectedType,
  setSelectedType,
  selectedDietary,
  setSelectedDietary,
  selectedRating,
  setSelectedRating
}) {

  console.log(selectedFlavor);
  const [flavorOpen, setFlavorOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [dietaryOpen, setDietaryOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [allFilters, setAllFilters] = useState(true);

  const toggleFlavor = () => setFlavorOpen(!flavorOpen);
  const toggleType = () => setTypeOpen(!typeOpen);
  const toggleDietary = () => setDietaryOpen(!dietaryOpen);
  const toggleRating = () => setRatingOpen(!ratingOpen);

  const dropdownAll = () => {
    setFlavorOpen(allFilters);
    setTypeOpen(allFilters);
    setDietaryOpen(allFilters);
    setRatingOpen(allFilters);
    setAllFilters(!allFilters);
  }

  const handleReset = () => {
    setSelectedFlavor([]);
    setSelectedType([]);
    setSelectedDietary([]);
    setSelectedRating([]);
    setFlavorOpen(false);
    setTypeOpen(false);
    setDietaryOpen(false);
    setRatingOpen(false);
  };

  const handleCheckboxChange = (value, selectedValues, setSelectedValues) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <aside className="sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="dropdown-all" onClick={dropdownAll}>
          <i className={`bi ${allFilters ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>
      </div>
      <hr/>

      <div className="buffer">
        <button onClick={toggleFlavor} className="dropdown-button">
          <div>Flavor</div>
          <i className={`bi ${flavorOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>
        {flavorOpen && (
          <div className="filter-type">
            {["Almond", "Banana", "Blueberry", "Caramel", "Chocolate", "Cinnamon", 
            "Coconut", "Cookies and Cream", "Lemon", "Mango", "Mint", "Peanut Butter", "Pistachio", 
            "Raspberry", "Strawberry", "Toffee", "Ube", "Vanilla"].map((flavor) => (
              <label key={flavor} className="dropdown-items">
                <input
                  type="checkbox"
                  checked={selectedFlavor?.includes(flavor)}
                  onChange={() => {
                    handleCheckboxChange(flavor, selectedFlavor, setSelectedFlavor);
                  }}
                />
                {flavor}
              </label>
            ))}
          </div>
        )}
      </div>
      <hr/>

      <div className="buffer">
        <button onClick={toggleType} className="dropdown-button">
          <div>Dessert Type</div>
          <i className={`bi ${typeOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>
        {typeOpen && (
          <div className="filter-type">
            {["Bread", "Brownie", "Cake", "Cookie", "Crepe", "Donut", "Fudge", 
            "Ice Cream", "Pie", "Pudding", "Soda"].map((type) => (
              <label key={type} className="dropdown-items">
                <input
                  type="checkbox"
                  checked={selectedType?.includes(type)}
                  onChange={() => {
                    handleCheckboxChange(type, selectedType, setSelectedType);
                  }}
                />
                {type}
              </label>
            ))}
          </div>
        )}
      </div>
      <hr/>

      <div className="buffer">
        <button onClick={toggleDietary} className="dropdown-button">
          <div>Dietary Preferences</div>
          <i className={`bi ${dietaryOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>
        {dietaryOpen && (
          <div className="filter-type">
            {["dairy-free", "egg-free", "gluten-free", "nut-free"].map((diet) => (
              <label key={diet} className="dropdown-items">
                <input
                  type="checkbox"
                  checked={selectedDietary?.includes(diet)}
                  onChange={() => {
                    handleCheckboxChange(diet, selectedDietary, setSelectedDietary);
                  }}
                />
                {diet}
              </label>
            ))}
          </div>
        )}
      </div>
      <hr/>

      <div className="buffer">
        <button onClick={toggleRating} className="dropdown-button">
          <div>Rating</div>
          <i className={`bi ${ratingOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>
        {ratingOpen && (
          <div className="filter-type">
            {["1 star", "2 stars", "3 stars", "4 stars", "5 stars"].map((star) => (
              <label key={star} className="dropdown-items">
                <input
                  type="checkbox"
                  checked={selectedRating?.includes(star)}
                  onChange={() => {
                    handleCheckboxChange(star, selectedRating, setSelectedRating);
                  }}
                />
                {star}
              </label>
            ))}
          </div>
        )}
      </div>
      <hr/>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="filter-reset"
      >
        Reset Filters
      </button>

    </aside>
  );
}

// src/components/Sidebar.jsx
import React, { useState } from "react";
import Tag from './Tag';
import '../css/Sidebar.css';

export default function Sidebar({
  selectedFlavor,
  setSelectedFlavor,
  selectedDessert,
  setSelectedDessert,
  selectedDietary,
  setSelectedDietary,
  selectedDegreeRequirement,
  setSelectedDegreeRequirement,
  showLabCourses,
  setShowLabCourses,
  showNoPrerequisites,
  setShowNoPrerequisites
}) {

  console.log(selectedFlavor);
  const [flavorOpen, setFlavorOpen] = useState(false);
  const [dessertOpen, setDessertOpen] = useState(false);
  const [dietaryOpen, setDietaryOpen] = useState(false);
  const [allFilters, setAllFilters] = useState(true);

  const toggleFlavor = () => setFlavorOpen(!flavorOpen);
  const toggleDessert = () => setDessertOpen(!dessertOpen);
  const toggleDietary = () => setDietaryOpen(!dietaryOpen);

  const dropdownAll = () => {
    setFlavorOpen(allFilters);
    setDessertOpen(allFilters);
    setDietaryOpen(allFilters);
    setAllFilters(!allFilters)
  }

  const handleReset = () => {
    setSelectedFlavor([]);
    setSelectedDessert([]);
    setSelectedDietary([]);
    setFlavorOpen(false);
    setDessertOpen(false);
    setDietaryOpen(false);
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
        <button onClick={toggleDessert} className="dropdown-button">
          <div>Dessert Type</div>
          <i className={`bi ${dessertOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>
        {dessertOpen && (
          <div className="filter-type">
            {["Bread", "Brownie", "Cake", "Cookie", "Crepe", "Donut", "Fudge", 
            "Ice Cream", "Pie", "Pudding", "Soda"].map((type) => (
              <label key={type} className="dropdown-items">
                <input
                  type="checkbox"
                  checked={selectedDessert?.includes(type)}
                  onChange={() => {
                    handleCheckboxChange(type, selectedDessert, setSelectedDessert);
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

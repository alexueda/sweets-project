// src/components/FilteredCards.jsx
import React, { useState } from "react";
import DessertCard from "./DessertCard";
import "../css/filteredCards.css";

const FilteredCards = ({ searchQuery }) => {


  return (
    <div>
      <DessertCard searchQuery={searchQuery} />
    </div>
  );
};

export default FilteredCards;

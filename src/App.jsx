// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState([]);
  const [selectedDessert, setSelectedDessert] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);


  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Header onSearchChange={handleSearchChange} />
      <div className="main-container">
        <Sidebar 
          selectedFlavor={selectedFlavor}
          setSelectedFlavor={setSelectedFlavor}
          selectedDessert={selectedDessert}
          setSelectedDessert={setSelectedDessert}
          selectedDietary={selectedDietary}
          setSelectedDietary={setSelectedDietary}
        />
        <MainContent 
          searchQuery={searchQuery} 
          selectedFlavor={selectedFlavor}
          selectedDessert={selectedDessert}
          selectedDietary={selectedDietary}
        />
      </div>
    </div>
  );
}

export default App;

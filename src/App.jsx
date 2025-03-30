// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
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
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedDietary={selectedDietary}
          setSelectedDietary={setSelectedDietary}
        />
        <MainContent 
          searchQuery={searchQuery} 
          selectedFlavor={selectedFlavor}
          selectedType={selectedType}
          selectedDietary={selectedDietary}
        />
      </div>
    </div>
  );
}

export default App;

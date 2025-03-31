// src/App.jsx
import React, { useState,useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Roulette from './components/Roulette';
import MainContent from './components/MainContent';
import { DessertDataContext } from './contextsGlobal/dessertDataContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove the '#'
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <DessertDataContext>
      <div className="app-container">
        <Header onSearchChange={handleSearchChange} />
        <div className="content-area">
          <Sidebar
            selectedFlavor={selectedFlavor}
            setSelectedFlavor={setSelectedFlavor}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedDietary={selectedDietary}
            setSelectedDietary={setSelectedDietary}
          />
          {currentPage === 'home' && (
            <MainContent
              searchQuery={searchQuery}
              selectedFlavor={selectedFlavor}
              selectedType={selectedType}
              selectedDietary={selectedDietary}
            />
          )}
          {currentPage === 'roulette' && <Roulette />}
        </div>
      </div>
    </DessertDataContext>
  );
}


export default App;

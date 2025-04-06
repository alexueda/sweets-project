import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import Router components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Roulette from './components/Roulette';
import MainContent from './components/MainContent';
import Login from './components/Login'; // Import Login component
import Register from './components/Register'; // Import Register component
import { DessertDataContext } from './contextsGlobal/dessertDataContext';
import Favorites from './components/Personal';
import Account from './components/Account';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <div className="main-container">
        {/* Always render Header */}
        <Header
          onSearchChange={handleSearchChange}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="content-area">
          {/* Render the main content (sidebar, main content, roulette, etc.) */}
          <Sidebar
            selectedFlavor={selectedFlavor}
            setSelectedFlavor={setSelectedFlavor}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedDietary={selectedDietary}
            setSelectedDietary={setSelectedDietary}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
          {currentPage === 'home' && (
            <MainContent
              searchQuery={searchQuery}
              selectedFlavor={selectedFlavor}
              selectedType={selectedType}
              selectedDietary={selectedDietary}
              selectedRating={selectedRating}
            />
          )}
          {currentPage === 'roulette' && <Roulette />}

          {/* Render the Login/Register if not logged in */}
          {!isLoggedIn && currentPage === 'login' && <Login setIsLoggedIn={setIsLoggedIn} />}
          {!isLoggedIn && currentPage === 'register' && <Register />}
        </div>
      </div>
    </DessertDataContext>
  );
}

export default App;
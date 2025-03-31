import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import Router components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Favorites from './components/Favorites';
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

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>  {/* Wrap the app in BrowserRouter */}
      <Header onSearchChange={handleSearchChange} />
      <div className="main-container">
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
        
        <Routes>  {/* Set up Routes for different pages */}
          <Route 
            path="/" 
            element={
              <MainContent 
                searchQuery={searchQuery} 
                selectedFlavor={selectedFlavor}
                selectedType={selectedType}
                selectedDietary={selectedDietary}
                selectedRating={selectedRating}
              />
            } 
          />
          {/* Add other routes as needed */}
          <Route path="/favorites" element={Favorites} />
          <Route path="/roulette" element={<div>Roulette Page</div>} />
          <Route path="/account" element={Account} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

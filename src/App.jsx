import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Roulette from './components/Roulette';
import MainContent from './components/MainContent';
import Login from './components/Login'; // Import Login component
import Register from './components/Register'; // Import Register component
import Personal from './components/Personal';
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
      const hash = window.location.hash.substring(1);
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <DessertDataContext>
        <div className="app-container">
          <Header
            onSearchChange={setSearchQuery}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <div className="content-area">
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
            <Routes>
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
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/roulette" element={<Roulette />} />
              <Route path="/account" element={<Account />} />
              {!isLoggedIn && <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />}
              {!isLoggedIn && <Route path="/register" element={<Register />} />}
            </Routes>
          </div>
        </div>
      </DessertDataContext>
    </BrowserRouter>
  );
}

export default App;

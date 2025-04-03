import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Roulette from './components/Roulette';
import MainContent from './components/MainContent';
import Login from './components/Login';
import Register from './components/Register';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
              
              {/* Redirect if already logged in */}
              <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
            </Routes>
          </div>
        </div>
      </DessertDataContext>
    </BrowserRouter>
  );
}

export default App;

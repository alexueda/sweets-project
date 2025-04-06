import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Roulette from './Components/Roulette';
import MainContent from './Components/MainContent';
import Login from './Components/Login';
import Register from './Components/Register';
import Personal from './Components/Personal';
import { DessertDataContext } from './contextsGlobal/dessertDataContext';
import Favorites from './Components/Personal';
import Account from './Components/Account';
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
              <Route path="/personal" element={<Personal />} />
              <Route path="/roulette" element={<Roulette />} />
              <Route path="/account" element={<Account />} />
              
              {/* Redirect if already logged in */}
              <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
              <Route path="/personal" element={isLoggedIn ? <Navigate to="/" /> : <Personal />} />
            </Routes>
          </div>
        </div>
      </DessertDataContext>
    </BrowserRouter>
  );
}

export default App;
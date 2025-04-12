import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import Sidebar from './components/Sidebar';
import Roulette from './components/Roulette';
import MainContent from './components/MainContent';
import Login from './components/Login';
import Register from './components/Register';
import Personal from './components/Personal';
import { DessertDataContext } from './contextsGlobal/dessertDataContext';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute'
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
  const [showSidebar, setShowSidebar] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <DessertDataContext>
        <div className="app-container">
          <Header
          ref={headerRef}
            onSearchChange={setSearchQuery}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <button
            className={`toggle-sidebar-btn fixed-btn ${showSidebar ? 'shifted' : ''}`}
            style={{ top: `${headerHeight + 10}px` }} // 10px spacing below header
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <i className="bi bi-list"></i>
          </button>
          <div className={`content-area ${showSidebar ? 'sidebar-open' : ''}`}>
            {showSidebar && (
              <div className="sidebar visible">
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
              </div>
            )}


            <div className="main-content-wrapper">
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
                <Route path="/roulette" element={<Roulette />} />
                <Route path="/account" element={<Account />} />
                <Route
                  path="/personal"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Personal />
                    </ProtectedRoute>
                  }
                />
                {/* Redirect if already logged in */}
                <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
              </Routes>
            </div>
          </div>
          <Footer/>
        </div>
      </DessertDataContext>
    </BrowserRouter>
  );
}

export default App;
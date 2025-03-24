// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PopupMenu from './components/PopupMenu';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Handler to update search query state
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      {/* Header / Navbar */}
      <Header onSearchChange={handleSearchChange} />

      {/* Main content area: Sidebar, Map, Popup Menu */}
      <div className="main-container">
        <Sidebar />
        <MainContent searchQuery={searchQuery} />
        <PopupMenu />
      </div>
    </div>
  );
}

export default App;

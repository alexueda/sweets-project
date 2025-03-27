// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Header onSearchChange={handleSearchChange} />
      <div className="main-container">
        <Sidebar />
        <MainContent searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default App;

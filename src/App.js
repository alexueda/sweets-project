// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PopupMenu from './components/PopupMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header / Navbar */}
      <Header />

      {/* Main content area: Sidebar, Map, Popup Menu */}
      <div className="main-container">
        <Sidebar />
        <MainContent />
        <PopupMenu />
      </div>
    </div>
  );
}

export default App;

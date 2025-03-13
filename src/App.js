import React from 'react';
import './App.css'; // Optional: create a CSS file for styles

function App() {
  return (
    <div className="App">
      {/* Header / Navbar */}
      <Header />

      {/* Main content area: Sidebar, Map, Popup Menu */}
      <div style={{ display: 'flex', minHeight: '80vh' }}>
        <Sidebar />
        <MainContent />
        <PopupMenu />
      </div>
    </div>
  );
}

// 1. Header Component
function Header() {
  return (
    <header style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Logo / Site Title */}
        <h1 style={{ margin: '0 1rem 0 0' }}>Sweets Project</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by dessert..."
          style={styles.searchInput}
        />
      </div>

      {/* Navigation Links */}
      <nav style={styles.navLinks}>
        <a href="#home" style={styles.link}>Home</a>
        <a href="#roulette" style={styles.link}>Roulette</a>
        <a href="#personal" style={styles.link}>Personal</a>
      </nav>
    </header>
  );
}

// 2. Sidebar Component (Filters & Dessert Info)
function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <h2>Filters</h2>
      <div style={styles.filterGroup}>
        <label><input type="checkbox" /> Dessert Type</label>
        <label><input type="checkbox" /> Directory</label>
        <label><input type="checkbox" /> Flower</label>
        <label><input type="checkbox" /> Distance</label>
        <label><input type="checkbox" /> Price</label>
        <label><input type="checkbox" /> Rating</label>
      </div>

      <h2>Dessert Name</h2>
      <div style={styles.dessertCard}>
        <img
          src="https://via.placeholder.com/80"
          alt="Dessert"
          style={{ marginRight: '1rem' }}
        />
        <div>
          <h3>Sample Dessert</h3>
          <p>Rating: ★★★★☆</p>
          <p>Rank: #1 in Provo</p>
        </div>
      </div>

      <h3>Example Tags:</h3>
      <div style={styles.tagContainer}>
        <Tag name="Peanut-Free" />
        <Tag name="Dairy-Free" />
        <Tag name="Gluten-Free" />
      </div>

      <h3>Flavors:</h3>
      <div style={styles.tagContainer}>
        <Tag name="Chocolate" />
        <Tag name="Vanilla" />
        <Tag name="Strawberry" />
      </div>
    </aside>
  );
}

// 3. Main Content (Map Placeholder)
function MainContent() {
  return (
    <main style={styles.main}>
      <h2>Map of Sweets in Provo, UT</h2>
      {/* Placeholder for a map */}
      <div style={styles.mapPlaceholder}>
        <p>Map API Placeholder</p>
      </div>
    </main>
  );
}

// 4. Popup Menu (Right Side)
function PopupMenu() {
  return (
    <div style={styles.popupMenu}>
      <h3>Popup Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="#profile" style={styles.link}>Profile</a></li>
        <li><a href="#settings" style={styles.link}>Settings</a></li>
        <li><a href="#logout" style={styles.link}>Log Out</a></li>
      </ul>
    </div>
  );
}

// 5. Tag Component for Example Tags/Flavors
function Tag({ name }) {
  return (
    <span style={styles.tag}>
      {name}
    </span>
  );
}

// Inline styles for simplicity (optional, you can move these to App.css)
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f6f6f6',
    borderBottom: '1px solid #ccc',
  },
  searchInput: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: 'blue',
  },
  sidebar: {
    width: '20%',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRight: '1px solid #ccc',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  dessertCard: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 0',
    padding: '0.5rem',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  tagContainer: {
    display: 'flex',
    gap: '0.5rem',
    margin: '0.5rem 0',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '0.3rem 0.6rem',
    backgroundColor: '#ddd',
    borderRadius: '12px',
    fontSize: '0.9rem',
  },
  main: {
    width: '60%',
    padding: '1rem',
  },
  mapPlaceholder: {
    height: '300px',
    border: '2px dashed #ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupMenu: {
    width: '20%',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderLeft: '1px solid #ccc',
  },
};

export default App;

// src/components/Roulette.jsx
import React, { useState } from 'react';
import dessertData from '../contextsGlobal/dessertData';
import DessertModal from './DessertModal';
import '../css/Roulette.css'; // Create this CSS file

function Roulette() {
  const [randomDessert, setRandomDessert] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    if (dessertData.length > 0 && !spinning) {
      setSpinning(true);
      setRandomDessert(null); // Clear previous result

      // Simulate spinning effect with a delay
      const spinDuration = 2000; // milliseconds
      const intervalTime = 100;
      let spinCount = 0;
      const spinInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * dessertData.length);
        setRandomDessert(dessertData[randomIndex]);
        spinCount++;
        if (spinCount * intervalTime >= spinDuration) {
          clearInterval(spinInterval);
          setSpinning(false);
          // Keep the last randomly selected dessert
        }
      }, intervalTime);
    } else if (dessertData.length === 0) {
      alert("No desserts available to pick!");
    }
  };

  const handleCloseModal = () => {
    setRandomDessert(null);
  };

  return (
    <div className="roulette-page">
      <h1>Dessert Roulette</h1>
      <p>Feeling lucky? Click the button to get a random dessert suggestion!</p>
      <button className={`spin-button ${spinning ? 'spinning' : ''}`} onClick={handleSpin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin!'}
      </button>

      {randomDessert && !spinning && (
        <div className="roulette-result">
          <h2>Your Random Dessert:</h2>
          <DessertModal dessert={randomDessert} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}

export default Roulette;
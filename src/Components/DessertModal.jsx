import React from "react";
import "../css/dessertModal.css"; // Create a CSS file for styling the modal

const DessertModal = ({ dessert, onClose }) => {
  if (!dessert) return null; // Don't render if no dessert is selected

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{dessert["dessert title"]}</h2>
        <p><strong>Restaurant:</strong> {dessert["restaurant"]}</p>
        <p><strong>Flavors:</strong> {dessert["flavor"].join(", ")}</p>
        <p><strong>Deals:</strong> {dessert["deals"].join(", ")}</p>
        <p><strong>Dietary Preferences:</strong> {dessert["dietary friendly"].join(", ") || "None"}</p>
        <p><strong>Reviews:</strong><br />{dessert["reviews"].map((review, index) => (
            <span key={index}>{review}<br /></span>
            ))}</p>
        {dessert["image"].length > 0 && <img src={dessert["image"][0]} alt={dessert["dessert title"]} />}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DessertModal;

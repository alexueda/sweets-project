import React, { useState } from "react";
import "../css/dessertModal.css";
import RenderStars from "./Stars"; // Assuming you have this component

const DessertModal = ({ dessert, onClose, onAddReview }) => {
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0); // State for the star rating

  if (!dessert) return null;

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewSubmit = () => {
    if (rating > 0 && newReview.trim() !== "") {
      onAddReview(dessert, { rating: rating, comment: newReview });
      setNewReview("");
      setRating(0); // Reset rating after submission
    } else if (rating === 0) {
      alert("Please select a star rating.");
    } else if (newReview.trim() === "") {
      alert("Please write a review comment.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{dessert["dessert title"]}</h2>
        <p><strong>Restaurant:</strong> {dessert["restaurant"]}</p>
        <p><strong>Flavors:</strong> {dessert["flavor"].join(", ")}</p>
        <p><strong>Deals:</strong> {dessert["deals"].join(", ")}</p>
        <p><strong>Dietary Preferences:</strong> {dessert["dietary friendly"].join(", ") || "None"}</p>

        <h3>Reviews:</h3>
        {dessert["reviews"].length > 0 ? (
          <p>
            {dessert["reviews"].map((review, index) => (
              <span key={index}>
                {review.rating && <RenderStars rating={review.rating} />}
                {review.comment && <><br />{review.comment}<br /></>}
                {!review.rating && review && <>{review}<br /></>} {/* Handle old string reviews */}
              </span>
            ))}
          </p>
        ) : (
          <p>No reviews yet.</p>
        )}

        <div>
          <h4>Add a Review:</h4>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => handleStarClick(star)}
                style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray', fontSize: '1.5em', marginRight: '5px' }}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            rows="3"
          />
          <button onClick={handleReviewSubmit}>Submit Review</button>
        </div>

        {dessert["image"].length > 0 && <img src={dessert["image"][0]} alt={dessert["dessert title"]} />}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DessertModal;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DessertCard from './DessertCard';
import RenderStars from './Stars';
import '../css/personal.css';

const Personal = () => {
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  const [showFavorites, setShowFavorites] = useState(true); // State to toggle between favorites and reviews
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    const reviews = JSON.parse(localStorage.getItem("userReviews") || "[]");
    setUserReviews(reviews.filter(review => review.user === currentUser));
  }, [currentUser]);

  const toggleSection = () => {
    setShowFavorites(prevState => !prevState); // Toggle between favorites and reviews
  };

  return (
    <div className="favorites-page">
      {/* Toggle button for small screens */}
      <button className="toggle-button" onClick={toggleSection}>
        {showFavorites ? "Show Reviews" : "Show Favorites"}
      </button>

      <div className={`favorites-left ${!showFavorites ? "hidden" : ""}`}>
        <h2>Your Favorite Desserts</h2>
        <DessertCard displayOnlyFavorites={true} />
      </div>

      <div className={`favorites-right ${showFavorites ? "hidden" : ""}`}>
        <h2>Your Reviews</h2>
        {userReviews.length > 0 ? (
          <div className="reviews-container">
            {userReviews.map((review, index) => (
              <div key={index} className="review-card">
                <h3>{review.dessertTitle} at {review.restaurant}</h3>
                <div className="review-stars">
                  <RenderStars rating={review.rating} />
                  <span>({review.rating})</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <p className="review-date">
                  Reviewed on {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't submitted any reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Personal;

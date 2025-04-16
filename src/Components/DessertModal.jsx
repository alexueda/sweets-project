import React, { useState, useContext } from "react";
import "../css/dessertModal.css";
import RenderStars from "./Stars";
import { useDessertDataContext } from "../contextsGlobal/dessertDataContext";

const DessertModal = ({ dessert, onClose }) => {
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const { filteredList, setFilteredList } = useDessertDataContext();
  const currentUser = localStorage.getItem("currentUser");

  if (!dessert) return null;

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewSubmit = () => {
    if (rating > 0 && newReview.trim() !== "") {
      const reviewData = {
        rating,
        comment: newReview,
        dessertTitle: dessert["dessert title"],
        restaurant: dessert["restaurant"],
        user: currentUser,
        date: new Date().toISOString()
      };

      const userReviews = JSON.parse(localStorage.getItem("userReviews") || "[]");
      userReviews.push(reviewData);
      localStorage.setItem("userReviews", JSON.stringify(userReviews));

      const updatedDesserts = filteredList.map(d => {
        if (d["dessert title"] === dessert["dessert title"]) {
          return {
            ...d,
            reviews: [...(d.reviews || []), { rating, comment: newReview, user: currentUser }]
          };
        }
        return d;
      });
      setFilteredList(updatedDesserts);

      setNewReview("");
      setRating(0);
    } else if (rating === 0) {
      alert("Please select a star rating.");
    } else if (newReview.trim() === "") {
      alert("Please write a review comment.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{dessert["dessert title"]}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="more-dessert-info">
          <div className="image-content">
            {dessert["image"] && (
              <img
                className="img"
                src={dessert["image"]}
                alt={dessert["dessert title"]}
              />
            )}
          </div>

          <div className="detail-content">
            <p><strong>Restaurant:</strong> {dessert["restaurant"]}</p>
            <p><strong>Flavors:</strong> {dessert["flavor"].join(", ")}</p>
            <p><strong>Deals:</strong> {dessert["deals"].join(", ")}</p>
            <p><strong>Dietary Preferences:</strong> {dessert["dietary friendly"].join(", ") || "None"}</p>
          </div>

          <div className="review-content">
            <h3>Reviews:</h3>
            {dessert["reviews"]?.length > 0 ? (
              <div>
                {dessert["reviews"].map((review, index) => (
                  <div key={index} className="review-item">
                    {review.rating && <RenderStars rating={review.rating} />}
                    {review.comment && <p>{review.comment}</p>}
                    {review.user && <p className="review-user">- {review.user}</p>}
                    {!review.rating && review && <p>{review}<br /></p>}
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default DessertModal;

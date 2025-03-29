import React from "react";
import "../css/stars.css"

const RenderStars = ({ rating }) => {
  const fullStars = Math.floor(rating); // Full stars count
  const hasHalfStar = rating % 1 !== 0; // Check for half-star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <>
      {" "}
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <i key={`full-${index}`} className="bi bi-star-fill"></i>
      ))}
      {/* Half Star */}
      {hasHalfStar && (
        <i className="bi bi-star-half"></i>
      )}
      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <i key={`empty-${index}`} className="bi bi-star"></i>
      ))}
    </>
  );
};

export default RenderStars;

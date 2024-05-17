import React from 'react';

function Review({ review, onDeleteReview }) {
  return (
    <>
      <ul>
        <li>Rating: {review.rating}</li>
        <li>Review: {review.review}</li>
        {/* Knapp för att ta bort recensionen */}
        <button onClick={() => onDeleteReview(review.id)}>Delete review</button>
      </ul>
    </>
  );
}

export default Review;

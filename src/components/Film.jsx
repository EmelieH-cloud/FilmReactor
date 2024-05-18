import React from 'react';
import Review from './Review';
import AddReviewForm from './AddReviewForm';
import '../App.css';

function Film({ obj, onDeleteFilm, onDeleteReview, onAddReview }) {
  return (
    <div className='film-container'>
      <h2>{obj.title}</h2>
      <button onClick={onDeleteFilm}>Delete Film</button>
      <h2>Reviews:</h2>
      {obj.reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          onDeleteReview={() => onDeleteReview(review.id)}
        />
      ))}
      <AddReviewForm onAddReview={(newReview) => onAddReview(obj.id, newReview)} />
    </div>
  );
}

export default Film;


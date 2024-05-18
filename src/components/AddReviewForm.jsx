import React, { useState } from 'react';
import '../App.css';

function AddReviewForm({ onAddReview }) {
  const [reviewText, setReviewText] = useState('');

  function handleReviewChange(e) 
  {
    setReviewText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Skapa en ny recension med unikt ID och text
    const newReview = {
      id: Date.now().toString(),
      text: reviewText
    };

    // Anropa onAddReview-funktionen som skickats som en prop
    onAddReview(newReview);

    // Återställ recensionstexten
    setReviewText('');
  }

  return (
    <div className='review-form-container'>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your review"
          value={reviewText}
          onChange={handleReviewChange}
        ></textarea>
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}

export default AddReviewForm;

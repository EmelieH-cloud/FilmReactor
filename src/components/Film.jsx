import React from 'react';
import Review from './Review';
import '../App.css';

function Film({ obj, onDeleteFilm, onDeleteReview }) {
  return (
    <div className='film-container'>
      {/* Renderar filmens titel */}
      <h2>{obj.title}</h2>

      {/* Knapp för att ta bort filmen */}
      <button onClick={onDeleteFilm}>Delete Film</button>

      {/* Visa lista över recensioner med Review-komponenten */}
      {obj.reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          onDeleteReview={onDeleteReview}  
        />
      ))}
      
 


    </div>
  );
}

export default Film;


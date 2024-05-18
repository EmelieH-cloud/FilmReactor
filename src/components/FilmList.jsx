import React, { useState, useEffect } from "react";
import Film from "./Film";
import AddFilmForm from "./AddFilmForm";
import '../App.css';

function FilmList() {
  const [films, setFilms] = useState([]);

  useEffect(() =>
   {
    fetch("http://localhost:3000/films")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data);
      });
  }, []);

  function handleOnDeleteFilm(chosenFilm) {
    let tempFilms = [...films];
    tempFilms = tempFilms.filter((f) => f.id !== chosenFilm.id);
    setFilms(tempFilms);
    deleteFilm(chosenFilm);
  }

  function deleteFilm(filmToDelete) {
    const deleteOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:3000/films/${filmToDelete.id}`, deleteOptions);
  }

  function handleOnDeleteReview(filmId, reviewId) {
    let tempFilms = [...films];
    let filmIndex = tempFilms.findIndex((f) => f.id === filmId);
    if (filmIndex !== -1) {
      tempFilms[filmIndex].reviews = tempFilms[filmIndex].reviews.filter((r) => r.id !== reviewId);
      setFilms(tempFilms);
      deleteReview(filmId, reviewId);
    }
  }

  function handleAddFilm(newFilm) {
    setFilms([...films, newFilm]);
    saveFilmToDatabase(newFilm);
  }

  function saveFilmToDatabase(newFilm) {
    fetch('http://localhost:3000/films', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFilm)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('New film added:', data);
      })
      .catch((error) => {
        console.error('Error adding new film:', error);
      });
  }

  function deleteReview(filmId, reviewId) {
    const deleteOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:3000/films/${filmId}/reviews/${reviewId}`, deleteOptions);
  }

  function handleAddReview(filmId, newReview) 
  {
    // skapa en kopia av film-arrayen 
    let tempFilms = [...films];
    // leta upp vilket index som filmen med detta film-id ligger på 
    let filmIndex = tempFilms.findIndex((f) => f.id === filmId);
    if (filmIndex !== -1) 
    {
      // om filmens index hittades, lägg till en ny recension till dess lista av recenioner. 
      tempFilms[filmIndex].reviews.push(newReview);

      // uppdatera filmlistan 
      setFilms(tempFilms);

      // kalla på metoden som sparar recensionen i "databasen"
      saveReviewToDatabase(filmId, newReview);
    }
  }

  function saveReviewToDatabase(filmId, newReview)
   {
    fetch(`http://localhost:3000/films/${filmId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('New review added:', data);
      })
      .catch((error) => {
        console.error('Error adding new review:', error);
      });
  }

  return (
    <>
      <h1>Film list:</h1>
      {films.map((f) => (
        <Film
          key={f.id}
          obj={f}
          onDeleteFilm={() => handleOnDeleteFilm(f)}
          onDeleteReview={(reviewId) => handleOnDeleteReview(f.id, reviewId)}
          onAddReview={handleAddReview}
        />
      ))}
      <h1>Add a new film:</h1>
      <AddFilmForm onAddFilm={handleAddFilm} />
    </>
  );
}

export default FilmList;

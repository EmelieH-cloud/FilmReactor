import React, { useState, useEffect } from "react";
import Film from "./Film";
import AddFilmForm from "./AddFilmForm";
import '../App.css';

function FilmList() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/films")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data);
      });
  }, []);

  function handleOnDeleteFilm(chosenFilm) {
    // Skapa en helt egen, unik och frikopplad kopia av array:en
    let tempFilms = [...films];

    // Filtrera ut filmen som användaren klickat på
    tempFilms = tempFilms.filter((f) => f.id !== chosenFilm.id);

    // Uppdatera state
    setFilms(tempFilms);

    // Ta bort film från "databasen"
    deleteFilm(chosenFilm);
  }

  function deleteFilm(filmToDelete) {
    const deleteOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    // skicka delete request till följande url 
    fetch(`http://localhost:3000/films/${filmToDelete.id}`, deleteOptions);
  }

  function handleOnDeleteReview(filmId, reviewId) {
    // Skapa en helt egen, unik och frikopplad kopia av array:en
    let tempFilms = [...films];

    // Hitta indexet för filmen
    let filmIndex = tempFilms.findIndex((f) => f.id === filmId);

    // Om filmen hittas, dvs index inte är -1 ..
    if (filmIndex !== -1) {
      //.. Gå in i "boxen" där denna film har alla sina recensioner, och filtrera bort aktuell recension.
      tempFilms[filmIndex].reviews = tempFilms[filmIndex].reviews.filter((r) => r.id !== reviewId);
      
      // Uppdatera state
      setFilms(tempFilms);

      // Ta bort från "databasen"
      deleteReview(filmId, reviewId);
    }
  }

    function handleAddFilm(newFilm) {
    // Lägg till den nya filmen i state för att uppdatera vyn
    setFilms([...films, newFilm]);
    // Lägg till den nya filmen i "databasen"
    saveFilmToDatabase(newFilm);
  }

    function saveFilmToDatabase(newFilm) {
    // Skicka en POST-förfrågan för att lägga till den nya filmen i "databasen"
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

  return (
    <>
      <h1>Film list:</h1>
      {films.map((f) => (
        <Film
          key={f.id}
          obj={f}
          onDeleteFilm={() => handleOnDeleteFilm(f)}
          onDeleteReview={(reviewId) => handleOnDeleteReview(f.id, reviewId)}
        />
      ))}
     <h1>Add a new film:</h1>
            <AddFilmForm onAddFilm={handleAddFilm} />

    </>
  );
}

export default FilmList;


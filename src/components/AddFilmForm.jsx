import React, { useState } from 'react';
import '../App.css';

function AddFilmForm({ onAddFilm }) {
  const [title, setTitle] = useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Förhindra sidan från att laddas om

    // Skapa ett unikt ID för den nya filmen
    const id = Date.now().toString();

    // Skapa en ny film med den angivna titeln och det unika ID:t
    const newFilm = {
      id: id,
      title: title,
      reviews: [] 
    };
    // Lägg till den nya filmen genom att anropa onAddFilm-funktionen som skickats som en prop
    onAddFilm(newFilm);

    // Återställ titeln till tom sträng efter att filmen har lagts till
    setTitle('');
  }

  return (
    <div className='form-container'>
   
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter film title"
        value={title}
        onChange={handleTitleChange}
      />
      <button type="submit">Add Film</button>
    </form>
    </div>
  );
}

export default AddFilmForm;

import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './Movies';
import SearchIcon from './search.svg';
//API access code ef84a297

const API_url = "https://www.omdbapi.com/?i=tt3896198&apikey=ef84a297";

const App = () => {
  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_url}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Superman');
  }, []);

  return (
    <div className='app'>
      <h1>FILMY</h1>

      <div className='search'>
        <input
          placeholder='Search for movie'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

        {movies?.length > 0 ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found...</h2>
            </div>
          )}
    </div>
  );
};

export default App;
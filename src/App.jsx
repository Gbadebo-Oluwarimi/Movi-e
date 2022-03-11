import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import searchIcon from "./search.svg";
import Moviecard from './components/Moviecard';

const App = () => {
  const API_URL = 'http://www.omdbapi.com?apikey=dc1b24c1'
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    searchMovies('Avengers');
  },[])

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }
  return (
    <div className='app'>
      <h1>Movie App</h1>
      <div className='search'>
        <input placeholder="Search for Movies" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <img src={searchIcon} onClick={() => searchMovies(search)}/>
      </div>
      {
        // checks if the movies length is zero
        movies?.length > 0 ? 
        (
          <div className="container">
            {movies.map((movie) => <Moviecard movie={movie}/>)}
            </div>
        ):(
          <div className='empty'>
            <h2>No Movie With That Name Exists </h2>
            </div>
        )
      }
    </div>
  )
}
export default App;

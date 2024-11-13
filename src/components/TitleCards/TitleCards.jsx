import React, {useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

import { Link } from 'react-router-dom'


const TitleCards = ({title, category}) => {

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);


  const [apiData,setApiData] = useState([]);

  const cardsRef = useRef();

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  useEffect(()=> {
    const fetchMovies = () => {

    fetch('https://api.jikan.moe/v4/top/anime?type=movie')
   .then(response => response.json())
   .then(response => {
    const movies = response.data; // Access the 'data' array

    // Sort by popularity
    const sortedByPopularity = [...movies].sort((a, b) => b.popularity - a.popularity);
    const top14Popular = sortedByPopularity.slice(0, 14);

    // Sort by score
    const sortedByScore = [...movies].sort((a, b) => b.score - a.score);
    const top14Rated = sortedByScore.filter(movie => !top14Popular.includes(movie)).slice(0, 14);

    const sortedByReleaseDate = [...movies].sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
    const top14Latest = sortedByReleaseDate.slice(0, 14);

    setPopularMovies(top14Popular);
    setTopRatedMovies(top14Rated);
    setLatestMovies(top14Latest);
    console.log(top14Popular);

   })
   .catch(error => console.error('Error:', error));
  };
  fetchMovies();

   const currentRef = cardsRef.current;
   currentRef.addEventListener('wheel', handleWheel);
   return () => {
    currentRef.removeEventListener('wheel', handleWheel); };
  },[]);


  const getMoviesToDisplay = () => {
    switch (category) {
      case 'popular':
        return popularMovies;
      case 'topRated':
        return topRatedMovies;
      case 'latest':
        return latestMovies;
      default:
        return popularMovies; // Default to popular movies
    }
  };

  const moviesTodisplay = getMoviesToDisplay();



  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {moviesTodisplay.map((movie, index) => {
          return <Link to={`/player/${movie.mal_id}`} className="card" key={index}>
            <img src={movie.images.jpg.image_url} alt={movie.title}></img>
            <p>{movie.title}</p>
          </Link>
        })}
      </div>

    </div>
  )
}

export default TitleCards

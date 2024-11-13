import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'


const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate();


  const [apiData, setApiData] = useState({
    title: "",
    duration: "",
    type: "",
    trailer: {
      youtube_id: "",
    },
  });


  useEffect(()=> {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
   .then(response => response.json())
   .then(response => {
    const { title, duration, type, trailer } = response.data;
        setApiData({
          title,
          duration,
          type,
          trailer,
        });
   })
    .catch(err=> console.error(err));
  },[id]);





  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=> {navigate(-1)}}></img>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.trailer.youtube_id}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.duration}</p>
        <p>{apiData.title}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player

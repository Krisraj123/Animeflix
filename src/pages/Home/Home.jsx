import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'


const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <div className="hero">
          <img src={hero_banner} alt="" className='banner-img'></img>
          <div className="hero-caption">
            <img src={hero_title} alt="" className='caption-img'></img>
            <p>Lorem ipsum ythehjejkwekekejejhehehehehejaekjaejejejejejajajejeje
              eueuaueaheehejaejenenejejejehehehejejaeajejej
            </p>
            <div className="hero-btns">
              <button className='btn'><img src={play_icon} alt=""></img>
                Play</button>
              <button  className='btn dark-btn'><img src={info_icon} alt=""></img>
                More Info</button>
            </div>

            <TitleCards category={"popularMovies"}/>

          </div>
        </div>
        <div className="more-cards" >
          <TitleCards title={"top14Rated"}  category="popularMovies" />
          <TitleCards title={"Only on Netflix"} category="topRated"/>
          <TitleCards title={"UpComing"} category="latest"/>
          <TitleCards title={"Top Pics For You"} category="popularMovies"/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home


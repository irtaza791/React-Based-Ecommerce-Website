import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Tdata from "./Tdata"
import pic1 from "./imgs/breezeUp1.jpg"
import pic2 from "./imgs/breezeUp2.jpg"
import pic3 from "./imgs/breezeUp3.jpg"
import pic4 from "./imgs/breezeUp4.jpg"
import Fade from 'react-reveal/Fade';
const TopCart = () => {


    

  return (
    <>
      <div className="collectionContainer">
      <h1 className="collectionH1">Our Featured Collection</h1>
        <div className="collection">
          <Fade left>
          <div className="collectionBox">
            <img src={pic1} alt="product1" />
            <div className="name">
              <p>Elite Breeze Up</p>
            </div>
           
          </div>
          </Fade>
          <Fade left>
          <div className="collectionBox">
            <img src={pic2} alt="product2" />
            <div className="name">
              <p>Elite Breeze Up</p>
              
            </div>

           
          </div>
          </Fade>
          <Fade right>
          <div className="collectionBox">
            <img src={pic3} alt="product3" />
            <div className="name">
              <p>Elite Breeze Up</p>
            </div>
            
          </div>
          </Fade>
          <Fade right>
          <div className="collectionBox">
            <img src={pic4} alt="product4" />
            <div className="name">
              <p>Elite Breeze Up</p>
            </div>
          </div>
          </Fade>
        </div>


      </div>

    </>
  )
}

export default TopCart
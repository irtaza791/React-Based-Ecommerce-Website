import React from 'react'
import Discount from '../components/discount/Discount'
import FlashDeals from '../components/flashDeals/FlashDeals'
import Home from '../components/mainpage/Home'
import NewArrivals from '../components/newarrivals/NewArrivals'
import FirstPost from '../components/textContent/FirstPost'
import TopCate from '../components/top/TopCate'
import Footer from '../common/footer/Footer'
import FeedbackSection from '../components/textContent/FeedBack'
const Pages = ({productItems , cartitem , addToCart}) => {
  return (
    <>
   
    <Home cartitem={cartitem} />
    <FirstPost/>
    
    <TopCate/>
    <FlashDeals  productItems = {productItems} addToCart={addToCart} />
    <NewArrivals />
    <FeedbackSection/>
  
    <Footer/>
  
    </>
  )
}

export default Pages
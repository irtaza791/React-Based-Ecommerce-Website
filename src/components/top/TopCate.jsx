import React from "react"
import "./style.css"
import TopCart from "./TopCart"
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const TopCate = () => {
  return (
    <>
      <section className='TopCate '>
        <div className='container'>
          <TopCart />
          <RouterLink to='/products'>
            <Button className="browseCollectionButton"  sx={{
                background: '#0f3460',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 600,
                display: 'block',
                margin: '0 auto',
                marginTop: '10px'
            
            }}>Browse Collection</Button>
          </RouterLink>
        </div>
      </section>
    </>
  )
}

export default TopCate 

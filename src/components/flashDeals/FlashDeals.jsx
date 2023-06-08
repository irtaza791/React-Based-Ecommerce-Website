import React from 'react';
import { Box, Typography } from '@mui/material';
import FlashCard from './FlashCard';


const FlashDeals = ({ productItems, addToCart }) => {
  return (
    
        <Box sx={{backgroundColor:'black', height:'60vh' ,padding:'30px'}}>
 
          <Typography
            variant="h1"
            style={{
              fontWeight: 400,
              fontSize: "30px",
              letterSpacing: "3px",
              color:'#d4a373',
              textAlign:'center',
              paddingLeft: "40px",
              marginBottom:'20px',
            }}
          >
            Flash Deals
          </Typography>
          
          <FlashCard productItems={productItems} addToCart={addToCart} />
        </Box>

      
  );
};

export default FlashDeals;

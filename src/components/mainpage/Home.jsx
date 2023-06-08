import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../common/header/Header'
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Model from '../../components/3d/Model'
import { styled } from '@mui/system';
import Zoom from 'react-reveal/Zoom';

const ResponsiveBox = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '0px 0px 50px 50px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    marginBottom:'50%',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  color: '#fff',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    display:'none',
  },
}));
const ResponsiveMainBox = styled(Box)(({ theme }) => ({
  height:'100vh',
  [theme.breakpoints.down('sm')]: {
    height:'50vh',
    
  },
  
}));

const ResponsiveHeader = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontFamily: "'Cinzel Decorative', cursive",
  fontSize: '4rem', 
  fontWeight:'800',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontFamily: "'Cinzel Decorative', cursive",
    fontSize: '1rem', 
    fontWeight:'800',
   
    // adjust this as needed
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1rem',
    
     // adjust this as needed
  },
}));
const ResponsiveBtn = styled(Button)(({theme})=>({
  color: 'white', 
  border: '1px solid white',
  [theme.breakpoints.down('sm')]: {
    color:'white',
    fontSize:'8px',
    marginBottom:'100px',

    
  },
  
}))
const Home = () => {
  return (
    <>
      <Header />

      <ResponsiveMainBox className="home" >

        <Model />
        <ResponsiveBox className="content">
          <Box className="heroTextContainer" textAlign="center">
            
              <ResponsiveHeader  >
                Elite Equine Solution
              </ResponsiveHeader>
           

            <ResponsiveTypography variant="body1">
              Our purpose is providing equestrians with top-quality horse equipment and accessories. Offering the best products in the market. Providing exceptional service to our customers.
            </ResponsiveTypography>

            <ResponsiveBtn component={RouterLink} to="/products" variant="outlined"  size="large">
              Shop Now
            </ResponsiveBtn>
          </Box>
        </ResponsiveBox>

      </ResponsiveMainBox>
    </>
  )
}

export default Home;

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import collage from './imgss/collage.jpg';
import { styled } from '@mui/system';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { Link as RouterLink } from 'react-router-dom';

const StyledPost = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(8),
  height:'100vh',
  boxShadow: theme.shadows[2],
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const StyledPostText = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    
  },
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '70%',
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color:'white', 
  width:'70%',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    width:'100%',
  },
}));

const StyledBody = styled(Typography)(({ theme }) => ({
  color:'white',
  width:'70%',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    width:'100%',
  },
}));


const FirstPost = () => {
  return (
    <StyledPost>
      <Fade left>
        <StyledPostText>
          <StyledTitle variant="h1" gutterBottom>
            Comfort and Reliability - Our Top Priority
          </StyledTitle>
          <StyledBody variant="body1" gutterBottom>
            Our Top Priority: At Elite Equine Solutions, the comfort and reliability of our products is our top priority. We understand the importance of having equipment that is not only functional but also comfortable for both horse and rider. Our products are designed to ensure maximum comfort and performance, while also being built to last. Whether you're a competitive rider or a weekend hobbyist, you can trust that our equipment will provide you with the comfort and reliability you need to take your riding to the next level.
          </StyledBody>
          <Button variant="contained" color="secondary" component={RouterLink} to="/products" sx={{marginTop:'20px'}} >
            lets Check out our shop...
          </Button>
        </StyledPostText>
      </Fade>
      <Fade right>
        <Box sx={{ width: '100%', borderRadius: '20px', overflow: 'hidden' }}>
          <StyledImage src={collage} alt="" />
        </Box>
      </Fade>
    </StyledPost>
  );
};

export default FirstPost;

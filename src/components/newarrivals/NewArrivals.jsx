import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Ndata from './Ndata';
import { Link as RouterLink } from 'react-router-dom';

const NewArrivals = () => {
  return (
    <Box sx={{ py: 5, backgroundColor: '#1e0100', color: 'white' }}>
      <Box sx={{ maxWidth: '80%', mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NewReleasesIcon sx={{color:'#f4442e'}} fontSize="large" />
            <Typography variant="h4" component="h2" sx={{ ml: 2 }}>New Arrivals</Typography>
          </Box>
          <Button component={RouterLink} to="/products" endIcon={<ArrowRightIcon />}>View all</Button>
        </Box>

        <Grid container spacing={3}>
          {Ndata.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ height:'480px',backgroundColor: 'black', padding: '10px', color: 'white', '&:hover': { boxShadow: 3 }}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.cover}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">{product.name}</Typography>
                    <Typography variant="body1">${product.price}</Typography>
                    <Typography variant="body2">{product.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default NewArrivals;

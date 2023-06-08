import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', p: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h1" color="inherit">
              EES
            </Typography>
            <ul>
              <li><Link href="/aboutus" color="inherit">About Us</Link></li>
              <li><Link href="#" color="inherit">Applewood,Swords,Dublin,Ireland</Link></li>
              <li><Link href="/contactus" color="inherit">Contact Us</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ul>
              <li><Link href="/privacyandpolicy" color="inherit">Privacy & Policy</Link></li>
              <li><Link href="/contactus" color="inherit">Support</Link></li>
              <li><Link href="/profile" color="inherit">Profile</Link></li>
              <li><Link href="/" color="inherit">Community FeedBacks</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit">
              Third column
            </Typography>
            <ul>
              <li><Link href="" color="inherit">Set Price Target</Link></li>
              <li><Link href="#" color="inherit">Set Favourite Items</Link></li>
              <li><Link href="/admin" color="inherit">Register</Link></li>
            </ul>
          </Grid>
        </Grid>
        <Typography variant="body2" color="inherit" align="center" style={{marginTop: '2rem'}}>
          © 2023 Elite Equine Solution
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;

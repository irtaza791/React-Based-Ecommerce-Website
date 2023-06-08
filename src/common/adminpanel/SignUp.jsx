import React, { useState } from 'react';
import { auth } from '../../firebase';
import AuthDetails from './AuthDetails';
import { useAuthState } from "react-firebase-hooks/auth"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './sign.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Navbar from "../header/Navbar";
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
const Admin = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("")
        setPassword("")
        setName("")
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (

    <div >
      <Navbar />
      {!user && (
             <Container component="main" maxWidth="xs">
           
             <Box
               sx={{
                 marginTop: 8,
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
               }}
             >
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                 <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                 Sign up
               </Typography>
               <Box component="form" noValidate onSubmit={signUp} sx={{ mt: 3 }}>
                 <Grid container spacing={2}>
                   <Grid item xs={12} sm={6}>
                     <TextField
                       autoComplete="given-name"
                       name="firstName"
                       required
                       fullWidth
                       id="firstName"
                       label="First Name"
                       autoFocus
                       onChange={(e) => setName(e.target.value)}
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     <TextField
                       required
                       fullWidth
                       id="lastName"
                       label="Last Name"
                       name="lastName"
                       autoComplete="family-name"
                       
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                       required
                       fullWidth
                       id="email"
                       label="Email Address"
                       name="email"
                       autoComplete="email"
                       onChange={(e) => setEmail(e.target.value)}
                       
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                       required
                       fullWidth
                       name="password"
                       label="Password"
                       type="password"
                       id="password"
                       autoComplete="new-password"
                       onChange={(e) => setPassword(e.target.value)}
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <FormControlLabel
                       control={<Checkbox value="allowExtraEmails" color="primary" />}
                       label="I want to receive inspiration, marketing promotions and updates via email."
                     />
                   </Grid>
                 </Grid>
                 <Button
                   type="submit"
                   fullWidth
                   variant="contained"
                   sx={{ mt: 3, mb: 2 }}
                 >
                   Sign Up
                 </Button>
                 <Grid container justifyContent="flex-end">
                   <Grid item>
                     <Link href="/admin" variant="body2">
                       Already have an account? Sign in
                     </Link>
                   </Grid>
                 </Grid>
               </Box>
             </Box>
             
           </Container>

      )}
      {user && (
        <div>
          
          <AuthDetails />
        </div>
      )}
    </div>
  );
};

export default Admin;

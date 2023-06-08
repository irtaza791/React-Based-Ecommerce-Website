import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from '@firebase/firestore';
import { firestore } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { Paper,Typography, Box, Container, Card, CardContent , Divider, CardMedia, CardHeader, CardActions, IconButton, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Remove ,Close} from '@mui/icons-material';
import { Grid } from '@mui/material';
import { List,ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@mui/material';
const Favourites = () => {

  const [favs, setFavs] = useState([]);
  const [userUid, setUserUid] = useState("");
  
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid)
      }
    })
    return () => {
      listen();
    }
  }, [])

  useEffect(() => {
    const fetchFavs = async () => {
      const favsRef = collection(firestore, "userdata", userUid, "favouriteitems");
      const querySnapshot = await getDocs(favsRef);

      const userFavs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFavs(userFavs);
      console.log(userFavs)
    };

    if (userUid) {
      fetchFavs();
    }
  }, [userUid]);

  const removeFav = async (id) => {
    const favRef = doc(firestore, "userdata", userUid, "favouriteitems", id);
    await deleteDoc(favRef);
    setFavs(favs.filter(fav => fav.id !== id));
  };

  return (


<Container>
    <Box sx={{ my: 4, p: 2, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" gutterBottom component="div" align="center">
        Favourites
      </Typography>
      <Divider/>
      {favs.map((favourite, index) => (
       <Paper key={favourite.id} sx={{ my: 2, p: 2 }}>
       <ListItem>
         <Grid container alignItems="center" spacing={2}>
           <Grid item xs={12} sm={2}>
             <ListItemAvatar>
               <Avatar variant="square" src={favourite.cover} />
             </ListItemAvatar>
           </Grid>
           <Grid item xs={12} sm={4}>
             <ListItemText
               primary={favourite.name}
             />
           </Grid>
           <Grid item xs={12} sm={2}>
             <ListItemText
               primary={`$${favourite.price}`}
             />
           </Grid>
           <Grid item xs={12} sm={2}>
             <Box mx={2}>
               <Rating name="read-only"  value={favourite.ratings} readOnly />
             </Box>
           </Grid>
           <Grid item xs={12} sm={2}>
             <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="delete" onClick={() => removeFav(favourite.id)}>
                 <Close />
               </IconButton>
             </ListItemSecondaryAction>
           </Grid>
         </Grid>
       </ListItem>
     </Paper>
      ))}
    </Box>
  </Container>
    
  )
}

export default Favourites;

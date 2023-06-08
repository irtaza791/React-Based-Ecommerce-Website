import React, { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { firestore } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import {Paper, Typography, Box, Container, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, Grid } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const PriceTargets = () => {
  const [targets, setTargets] = useState([]);
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
    const fetchTargets = async () => {
      const targetRef = collection(firestore, "userdata", userUid, "priceTargets");
      const querySnapshot = await getDocs(targetRef);

      const targets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTargets(targets);
    };

    if (userUid) {
      fetchTargets();
    }
  }, [userUid]);


  return (
    <Container>
        <Box sx={{ my: 4, p: 2, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h4" gutterBottom component="div" align="center">
                My Targets
            </Typography>
            <Divider />
            <List>
                <ListItem>
                    <ListItemAvatar></ListItemAvatar>
                    <ListItemText primary="Product" />
                    <ListItemText primary="Target Price" align="center" />
                    <ListItemText primary="Current Price" align="right" />
                </ListItem>
            </List>
            {targets.map((target, index) => (
                <Paper key={target.id} sx={{ my: 2, p: 2 }}>
                    <Grid container spacing={2} sx={{ backgroundColor: target.productPrice === target.priceTarget ? '#4d8734' : 'inherit' , color: target.productPrice === target.priceTarget ? 'white' : 'inherit'}}>
                        <Grid item xs={12} sm={4}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar variant="rounded" src={target.productCover} />
                                </ListItemAvatar>
                                <ListItemText primary={target.productName} secondary={`ID: ${target.productId}`}/>
                            </ListItem>
                        </Grid>
                        <Grid item xs={12} sm={3} align="center">
                            <ListItemText primary={`$${target.priceTarget}`}/>
                        </Grid>
                        <Grid item xs={12} sm={3} align="center">
                            <ListItemText primary={`$${target.productPrice}`}/>
                        </Grid>
                        <Grid item xs={12} sm={2} align="center">
                            <ListItemText primary={`Matched`} sx={{ display: target.productPrice === target.priceTarget ? '' : 'none' }}/>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Box>
    </Container>
  )
}

export default PriceTargets

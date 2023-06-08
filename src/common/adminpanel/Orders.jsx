import React, { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { firestore } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { Grid, Paper,Typography, Box, Container, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Orders = () => {
  const [orders, setOrders] = useState([]);
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
    const fetchOrders = async () => {
      const ordersRef = collection(firestore, "userdata", userUid, "orders");
      const querySnapshot = await getDocs(ordersRef);

      const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(userOrders);
    };

    if (userUid) {
      fetchOrders();
    }
  }, [userUid]);

  return (
    <Container>
      <Box sx={{ my: 4, p: 2, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" gutterBottom component="div" align="center">
          My Orders
        </Typography>
        <Divider />
        {orders.map((order, index) => (
          <Paper key={order.id} sx={{ my: 2, p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ShoppingCartIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Order Number: ${index + 1}`}
                    secondary={`Total Price: $${order.totalPrice}`}
                  />
                </ListItem>
              </Grid>
              <Grid item xs={12} md={6}>
                <ListItem>
                  <ListItemText
                    primary={`Placed on: ${new Date(
                      order.orderDate.toDate().toString()
                    )}`}
                    align="right"
                  />
                </ListItem>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Orders;

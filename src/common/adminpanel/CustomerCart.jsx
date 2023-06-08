import React, { useEffect, useState } from "react"
import { auth } from '../../firebase';
import { deleteDoc, updateDoc, getDoc, doc, getDocs, collection } from "@firebase/firestore"
import { firestore } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {Paper, Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { Hidden,Container, ListItem, ListItemAvatar, ListItemText, Divider, List, ListItemSecondaryAction, Avatar, IconButton } from '@mui/material';
import { Add, Remove, Close } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CustomerCart = () => {
  const [products, setProducts] = useState([]);
  const [userUid, setUserUid] = useState("")
  const [authUser, setAuthUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
        const adminUid = '4BPLKYa8PkUOSfP9Qnmau45ZC173'
        setUserUid(user.uid)
        setIsAdmin(user.uid === adminUid);

      } else {
        setAuthUser(null);
        setIsAdmin(false);
      }
    })
    return () => {
      listen();
    }
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let products = [];
        if (authUser) {
          const cartRef = collection(firestore, "userdata", userUid, "cart");
          const querySnapshot = await getDocs(cartRef);
          products = querySnapshot.docs.map(doc => doc.data());
        } 
        setProducts(products);
  
        // calculate total price based on the products in the cart
        const newTotalPrice = products.reduce((total, product) => {
          return total + (product.price * product.quantity);
        }, 0);
        setTotalPrice(newTotalPrice);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchProducts();
  }, [firestore, userUid, authUser]);


  const increaseQty = async (productId) => {
    try {
      let updatedProducts = [];
      if (authUser) {
        const cartRef = collection(firestore, "userdata", userUid, "cart");
        const cartDocRef = doc(cartRef, productId);
        const cartDoc = await getDoc(cartDocRef);
  
        if (cartDoc.exists()) {
          const cartData = cartDoc.data();
          const newQuantity = cartData.quantity + 1;
          await updateDoc(cartDocRef, { quantity: newQuantity });
  
          // fetch the updated products from the database
          const querySnapshot = await getDocs(cartRef);
          updatedProducts = querySnapshot.docs.map(doc => doc.data());
        }
      }
      // update the state with the new products
      setProducts(updatedProducts);
  
      // recalculate the total price
      const newTotalPrice = updatedProducts.reduce((total, product) => {
        return total + (product.price * product.quantity);
      }, 0);
      setTotalPrice(newTotalPrice);
    } catch (error) {
      console.error(error);
    }
  };
  // Just do the same with decrease and remove 



  const decreaseQty = async (productId) => {
    const cartRef = collection(firestore, "userdata", userUid, "cart");
    const cartDocRef = doc(cartRef, productId);
    const cartDoc = await getDoc(cartDocRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const newQuantity = cartData.quantity - 1;

      // Check if the new quantity is greater than 0 before updating the quantity
      if (newQuantity > 0) {
        await updateDoc(cartDocRef, { quantity: newQuantity });

        // fetch the updated products from the database
        const querySnapshot = await getDocs(cartRef);
        const updatedProducts = querySnapshot.docs.map(doc => doc.data());

        // update the state with the new products
        setProducts(updatedProducts);

        // recalculate the total price
        const newTotalPrice = updatedProducts.reduce((total, product) => {
          return total + (product.price * product.quantity);
        }, 0);
        setTotalPrice(newTotalPrice);
      }
    }
  };

  const removeProduct = async (productId) => {
    const cartRef = collection(firestore, "userdata", userUid, "cart");
    const cartDocRef = doc(cartRef, productId);
    const cartDoc = await getDoc(cartDocRef);

    if (cartDoc.exists()) {
      await deleteDoc(cartDocRef);

      // fetch the updated products from the database
      const querySnapshot = await getDocs(cartRef);
      const updatedProducts = querySnapshot.docs.map((doc) => doc.data());

      // update the state with the new products
      setProducts(updatedProducts);

      // recalculate the total price
      const newTotalPrice = updatedProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
      setTotalPrice(newTotalPrice);
    }
  };
  return (
   
     <Container>
      <Box sx={{ my: 4, p: 2, backgroundColor: '#f9f9f9' }}>
    <Typography variant="h4" gutterBottom component="div" align="center">
      Customer Cart
    </Typography>
    <Divider/>
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <List>
          {products.length === 0 ? (
            <Typography variant="h5" gutterBottom>No Items in Cart</Typography>
          ) : (
            products.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ShoppingCartIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                      <Hidden smDown>
                        {`Price: $${item.price}.00 - Product Total: $${item.price * item.quantity}.00 - Quantity: ${item.quantity}`}
                      </Hidden>
                      <Hidden mdUp>
                        {`Price: $${item.price}.00`}
                        {`Product Total: $${item.price * item.quantity}.00`}
                        {`Quantity: ${item.quantity}`}
                      </Hidden>
                    </>
                    }
                  />
                  <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="increase" onClick={() => increaseQty(item.productId)}>
                      <Add />
                    </IconButton>
                    <IconButton edge="end" aria-label="decrease" onClick={() => decreaseQty(item.productId)}>
                      <Remove />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => removeProduct(item.productId)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
              Cart Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
              <Typography variant="body1">Total Price:</Typography>
              <Typography variant="body1" fontWeight="bold">${totalPrice}.00</Typography>
            </Box>
            <Button component={RouterLink} to="/checkout" variant="contained" color="primary" fullWidth>
              Checkout
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </Box>
  </Container>
    
  )
}

export default CustomerCart


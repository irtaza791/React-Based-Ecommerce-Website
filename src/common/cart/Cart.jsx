import React, { useEffect, useState } from "react"
import { auth } from '../../firebase';
import { setDoc, deleteDoc, updateDoc, getDoc, doc, getDocs, collection } from "@firebase/firestore"
import { firestore } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import "./style.css"
import Navbar from "../header/Navbar";
import { TextField, Box, Typography, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import { Add, Remove, Close } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Footer from "../footer/Footer";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [userUid, setUserUid] = useState("")
  const [authUser, setAuthUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        } else {
          // Fetch products from local storage for unauthenticated users
          const localCart = localStorage.getItem('cartItems');
          if (localCart) {
            products = JSON.parse(localCart);
          }
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
  
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Retrieve items from local storage
        const localCart = localStorage.getItem('cartItems');
        if (localCart) {
          const cartProducts = JSON.parse(localCart);
          // Iterate over the items and add them to Firestore
          for (let product of cartProducts) {
            const newCartRef = doc(collection(firestore, "userdata", userCredential.user.uid, "cart"), product.productId);
            await setDoc(newCartRef, { ...product });
          }
          // Clear local storage after migration
          localStorage.removeItem('cartItems');
        }
  
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
      })
  }







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
    } else {
      // Handle quantity increase in local storage for unauthenticated users
      const localCart = localStorage.getItem('cartItems');
      if (localCart) {
        const cartProducts = JSON.parse(localCart);
        console.log(`Local cart products: ${JSON.stringify(cartProducts)}`);
        const cartProductIndex = cartProducts.findIndex(product => product.productId === productId);

        console.log(`Product ID to increase: ${productId}`);
        console.log(`Found product at index: ${cartProductIndex}`);
        if (cartProductIndex > -1) {
          cartProducts[cartProductIndex].quantity += 1;
          localStorage.setItem('cartItems', JSON.stringify(cartProducts));
          updatedProducts = cartProducts;
        }
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
    try{
      let updatedProducts = []
      if (authUser){
        const cartRef = collection(firestore, "userdata", userUid, "cart");
        const cartDocRef = doc(cartRef, productId);
        const cartDoc = await getDoc(cartDocRef);
        if (cartDoc.exists()){
          const cartData = cartDoc.data();
          const newQuantity = cartData.quantity - 1;
          if(newQuantity >0){
            await updateDoc(cartDocRef, { quantity: newQuantity });
            const querySnapshot = await getDocs(cartRef);
             updatedProducts = querySnapshot.docs.map(doc => doc.data());
          }
        }
        
      }
      else{
         const localCart = localStorage.getItem('cartItems');
         if (localCart) {
         const cartProducts = JSON.parse(localCart);
           console.log(`Local cart products: ${JSON.stringify(cartProducts)}`);
           const cartProductIndex = cartProducts.findIndex(product => product.productId === productId);

          console.log(`Product ID to increase: ${productId}`);
           console.log(`Found product at index: ${cartProductIndex}`);
           if (cartProductIndex > -1) {
             cartProducts[cartProductIndex].quantity -= 1;
             if(cartProducts[cartProductIndex].quantity > 0){
              localStorage.setItem('cartItems', JSON.stringify(cartProducts));
              updatedProducts = cartProducts;
             }
      }
    }
  }
      setProducts(updatedProducts);

    const newTotalPrice = updatedProducts.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
    setTotalPrice(newTotalPrice);
    } catch(error){
      console.error(error);
    }
  }



    

  const removeProduct = async (productId) => {
    let updatedProducts = [];
  
    if (authUser) {
      const cartRef = collection(firestore, "userdata", userUid, "cart");
      const cartDocRef = doc(cartRef, productId);
      const cartDoc = await getDoc(cartDocRef);
  
      if (cartDoc.exists()) {
        await deleteDoc(cartDocRef);
  
        // fetch the updated products from the database
        const querySnapshot = await getDocs(cartRef);
        updatedProducts = querySnapshot.docs.map((doc) => doc.data());
      }
    } else {
      // Handle product removal for unauthenticated users using local storage
      const localCart = localStorage.getItem('cartItems');
      if (localCart) {
        const cartProducts = JSON.parse(localCart);
        const updatedCartProducts = cartProducts.filter(product => product.productId !== productId);
  
        // update local storage with the updated cart
        localStorage.setItem('cartItems', JSON.stringify(updatedCartProducts));
        updatedProducts = updatedCartProducts;
      }
    }
  
    // update the state with the new products
    setProducts(updatedProducts);
  
    // recalculate the total price
    const newTotalPrice = updatedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };
  
  return (
    <>
  <Navbar />
  <Box className="cart-items" sx={{ p: 2 }}>
  <Grid container spacing={2}>
    <Grid item xs={12} md={8}>
      {products.length === 0 ? (
        <Typography variant="h5" gutterBottom>No Items in Cart</Typography>
      ) : (
        products.map((item) => {
          const productQty = item.price * item.quantity;
          return (
            <Card key={item.id} sx={{ display: 'flex', m: 2, p: 2, boxShadow: 3, borderRadius: 2 }}>
              <Box component="img" src={item.cover} alt="" sx={{   height: { xs: 100, md: 200 }, 
              width: { xs: 100, md: 200 }, 
              objectFit: 'cover', borderRadius: 2}} />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ml: 2, flexGrow: 1 }}>
                <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Price: <span style={{ color: '#000' }}>${item.price}.00</span>
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Product Total: <span style={{ color: '#000' }}>${productQty}.00</span>
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <IconButton onClick={() => decreaseQty(item.productId)} color="primary"><Remove /></IconButton>
                    <Typography variant="body1">{item.quantity}</Typography>
                    <IconButton onClick={() => increaseQty(item.productId)} color="primary"><Add /></IconButton>
                  </Box>
                  <IconButton onClick={() => removeProduct(item.productId)} color="error"><Close /></IconButton>
                </Box>
              </CardContent>
            </Card>
          );
        })
      )}
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
          {authUser ? (
            <Button component={RouterLink} to="/checkout" variant="contained" color="primary" fullWidth>
            Checkout Securely
          </Button>

          ):(
            <Box component="form" noValidate onSubmit={signUp} sx={{ mt: 3 }} >
                      <TextField
                       required
                       fullWidth
                       id="email"
                       label="Email Address"
                       name="email"
                       autoComplete="email"
                       onChange={(e) => setEmail(e.target.value)}
                       
                     />
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
                 <Button
                   type="submit"
                   fullWidth
                   variant="contained"
                   sx={{ mt: 3, mb: 2 }}
                 >
                   Sign Up to securily checkout
                 </Button>
            </Box>
          )}
          
        </CardContent>
      </Card>
    </Grid>
  </Grid>

</Box>
<Footer/>
</>
  )
}

export default Cart
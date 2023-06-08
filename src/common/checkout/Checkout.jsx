import React, { useEffect, useState } from "react";
import "./style.css";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { doc,setDoc, getDocs, collection, writeBatch } from "@firebase/firestore";
import { firestore } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import Navbar from "../header/Navbar";
import { addDoc } from '@firebase/firestore';
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


export const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [userUid, setUserUid] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cardNumber, setCardNumber] = useState('');

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
        const cartRef = collection(firestore, "userdata", userUid, "cart");
        const querySnapshot = await getDocs(cartRef);
        const products = querySnapshot.docs.map(doc => doc.data());
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
    if (userUid) {
      fetchProducts();
    }
  }, [firestore, userUid]);

  // State for order confirmation
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Function to clear user's cart
  const clearCart = async () => {
    const cartRef = collection(firestore, "userdata", userUid, "cart");
    const cartSnapshot = await getDocs(cartRef);
    const batch = writeBatch(firestore);

    cartSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  };
  const placeOrder = async () => {
    try {
      const order = {
        products,
        totalPrice,
        orderDate: new Date(),
        shippingAddress: {
          fullName,
          address,
          city
        },
        paymentInformation: {
          cardNumber
        }

      };
      const orderForAdmin = {
        products,
        orderDate: new Date(),
        shippingAddress: {
          fullName,
          address,
          city
        },
        paymentInformation: {
          cardNumber
        }

      }

      const ordersRef = collection(firestore, "userdata", userUid, "orders");
      const allOrdersRef = collection(firestore,"productsSold")
      const allOrdersDocRef = doc(allOrdersRef,fullName) 
      await setDoc(allOrdersDocRef, orderForAdmin);
      const docRef = await addDoc(ordersRef, order);
      const orderNumber = docRef.id;
      await clearCart();
      console.log("Order placed with number: ", orderNumber);
      // Here you could implement logic to clear the user's cart after successfully placing the order
      setOrderConfirmation({
        orderNumber,
        ...order,
      });
    } catch (e) {
      console.error("Error placing order: ", e);
    }
  };

  // Download Order Confirmation as PDF
  const downloadConfirmation = () => {
    setTimeout(async () => {
      const input = document.getElementById("orderConfirmation");
      if (input) {
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("order-confirmation.pdf");
      } else {
        console.log("Element not found");
      }
    }, 200);
  };




  return (
    <Box>
      <Navbar />

      {orderConfirmation ? (
        <Box id="orderConfirmation" sx={{ py: 2 }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h4" component="div" sx={{ mb: 2 }}>
              Order Successfully Placed!
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Order Number"
                  secondary={orderConfirmation.orderNumber}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Total Price"
                  secondary={`$${orderConfirmation.totalPrice}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Shipping Address"
                  secondary={`${orderConfirmation.shippingAddress.fullName}, ${orderConfirmation.shippingAddress.address}, ${orderConfirmation.shippingAddress.city}`}
                />
              </ListItem>
            </List>
            <Button variant="contained" color="primary" component={RouterLink} to="/">
              Return Home
            </Button>
            <Button variant="contained" color="secondary" onClick={downloadConfirmation}>
              Download Confirmation
            </Button>
          </Paper>
        </Box>

      ) : (
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography variant="h2" sx={{ mb: 4 }}>
            Checkout
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ flex: '0 0 48%', pr: 2 }}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                Shipping Address
              </Typography>
              <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                <TextField
                  label="Full Name"
                  fullWidth
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                  label="Address"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} />
                <TextField
                  label="City"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Box>

              <Typography variant="h4" sx={{ mb: 3 }}>
                Payment Information
              </Typography>
              <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                <TextField
                  label="Card Number"
                  fullWidth
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)} />
              </Box>

              <Button variant="contained" color="primary" fullWidth onClick={placeOrder}>
                Place Order
              </Button>
            </Box>

            <Box sx={{ flex: '0 0 48%', pl: 2 }}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                In Your Bag
              </Typography>
              {products.map((item) => (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>${item.price}.00 * {item.quantity}</Typography>
                </Box>
              ))}
              <Typography variant="h5" sx={{ mt: 4 }}>
                Total Price: ${totalPrice}.00
              </Typography>
            </Box>
          </Box>
        </Container>

      )}

    </Box>
  );
};

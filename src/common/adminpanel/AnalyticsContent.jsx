import React, { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { firestore } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { Grid, Paper,Typography, Box, Container, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Card, CardMedia, CardContent } from '@mui/material';


const AnalyticsContent = () => {
  const [userUid, setUserUid] = useState("");
  const [productCounts, setProductCounts] = useState({});
  const [mostOrdered, setMostOrdered] = useState(null);
  const [leastOrdered, setLeastOrdered] = useState(null);
  const [productData, setProductData] = useState({});
  const [todaysSales, setTodaysSales] = useState(0);
const [todaysOrders, setTodaysOrders] = useState(0);
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


  const fetchOrders = async () => {
    const allOrdersSnap = await getDocs(collection(firestore, "productsSold"));
    const counts = {};
    const data = {};
    let sales = 0;
    let orders = 0;
  
    allOrdersSnap.forEach(doc => {
      const order = doc.data();
      const orderDate = new Date(order.orderDate.seconds * 1000);
      const today = new Date();
      if (orderDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        orders += 1;
        sales += order.products.reduce((sum, product) => sum + Number(product.price), 0);
      }
      order.products.forEach(product => {
        counts[product.name] = (counts[product.name] || 0) + 1;
        if (!data[product.name]) {
          data[product.name] = {
            cover: product.cover,
            price: product.price,
          };
        }
      });
    });
  
    setProductCounts(counts);
    setProductData(data);
    setTodaysSales(sales);
    setTodaysOrders(orders);
  };
  
  fetchOrders();
  
  
  
  console.log(productCounts);
  console.log(productData);



useEffect(() => {
  if (productCounts) {
    let mostOrderedProduct = null;
    let leastOrderedProduct = null;
    let maxCount = -Infinity;
    let minCount = Infinity;

    for (const [productName, count] of Object.entries(productCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostOrderedProduct = productName;
      }
      if (count < minCount) {
        minCount = count;
        leastOrderedProduct = productName;
      }
    }

    setMostOrdered({ name: mostOrderedProduct, count: maxCount });
    setLeastOrdered({ name: leastOrderedProduct, count: minCount });
  }
}, [productCounts]);
  const allOrdersRef = collection(firestore,"productsSold")
  return (
<Container sx={{marginBottom:'100px'}}>

  <Grid container spacing={3}>
   
  <Grid item xs={12}>
  <Typography variant='h2' align='center' sx={{marginTop:'20px',marginBottom:'20px'}}>
      Todays Performance

    </Typography>
    < Paper>
      <Typography sx={{padding:"10px"}} variant="h4">Today's Sales</Typography>
      <Typography sx={{padding:"10px"}} variant="h6">${todaysSales}</Typography>
  
  
    
      <Typography sx={{padding:"10px"}} variant="h4">Today's Orders</Typography>
      <Typography sx={{padding:"10px"}} variant="h6">{todaysOrders}</Typography>
    </Paper>
  </Grid>
 
    <Grid item xs={12} sm={6}>
      <Typography variant="h4" component="div" sx={{ textAlign: 'center', marginBottom: 1 }}>
        Most Ordered Product
      </Typography>
      {mostOrdered && productData[mostOrdered.name] ?
        <Card sx={{ maxWidth: 345, margin: 'auto' }}>
          <CardMedia
            component="img"
            height="140"
            image={productData[mostOrdered.name].cover}
            alt={mostOrdered.name}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {mostOrdered.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity Sold: {productCounts[mostOrdered.name]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {productData[mostOrdered.name].price}€
            </Typography>
          </CardContent>
        </Card>
        :
        <div>Loading...</div>
      }
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h4" component="div" sx={{ textAlign: 'center', marginBottom: 1 }}>
        Least Ordered Product
      </Typography>
      {leastOrdered && productData[leastOrdered.name] ?
        <Card sx={{ maxWidth: 345, margin: 'auto' }}>
          <CardMedia
            component="img"
            height="140"
            image={productData[leastOrdered.name].cover}
            alt={leastOrdered.name}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {leastOrdered.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity Sold: {productCounts[leastOrdered.name]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {productData[leastOrdered.name].price}€
            </Typography>
          </CardContent>
        </Card>
        :
        <div>Loading...</div>
      }
    </Grid>
  </Grid>
</Container>

  )
}

export default AnalyticsContent
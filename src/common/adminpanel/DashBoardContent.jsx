import React, { useEffect, useState } from 'react';
import {Grid, Paper, Typography } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from '../../firebase';
import {  getDocs, collection } from '@firebase/firestore';

// Import additional Material-UI components for chart
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DashBoardContent = () => {
  const [authUser, setAuthUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'products'));
      const products = querySnapshot.docs.map((doc) => doc.data());
      setProducts(products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSoldProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'productsSold'));
      const soldProducts = querySnapshot.docs.map((doc) => doc.data());
      setSoldProducts(soldProducts);

      const totalItems = querySnapshot.size;
      setTotalOrders(totalItems);

      const newTotalPrice = soldProducts.reduce((total, productSold) => {
        const productPrices = productSold.products.map((product) => product.price);
        return total + productPrices.reduce((sum, price) => sum + (price * 1), 0);
      }, 0);
      setTotalRevenue(newTotalPrice);
    };
    fetchSoldProducts();
  }, []);
  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log('sign out successful')
    }).catch(error => console.error(error))
  }

  // Example sales data for the line chart
  const salesData = [
    { month: 'Jan', sales: 200 },
    { month: 'Feb', sales: 350 },
    { month: 'Mar', sales: 400 },
    { month: 'Apr', sales: 500 },
    { month: 'May', sales: 600 },
    { month: 'Jun', sales: 750 },
    { month: 'Jul', sales: 900 },
    { month: 'Aug', sales: 800 },
    { month: 'Sep', sales: 650 },
    { month: 'Oct', sales: 550 },
    { month: 'Nov', sales: 400 },
    { month: 'Dec', sales: 300 },
  ];

  return (
    <>
          <div style={{marginBottom:'50px'}} className="dashboard-container">
          <Grid container spacing={2} sx={{marginTop:3 , marginLeft:1}}>
          <Grid item xs={11} md={5}>
  <Paper elevation={3} sx={{ padding: 2 }}>
    <Typography  variant="h3" sx={{ marginBottom: 1, color:'primary.main'}}>
      Sales Data
    </Typography>
    <div className="sales-summary">
      <div className="summary-item">
        <Typography variant="body1" sx={{ fontWeight: 'bold'}}>
          Revenue:
        </Typography>
        <Typography variant="h4">{totalRevenue}€</Typography>
      </div>
      <div className="summary-item">
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Orders:
        </Typography>
        <Typography variant="h4"sx={{ fontWeight: 'bold'}}>
        {totalOrders}
        </Typography>
      </div>
      <div className="summary-item">
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Average Order Value:
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
        {(totalRevenue / totalOrders).toFixed(1)}€
        </Typography>
      </div>
    </div>
  </Paper>
</Grid>



      <Grid item xs={11} md={6}>
        <Paper elevation={3} sx={{height:'370px', padding: 2 }}>
          <Typography variant="h4" sx={{ marginBottom: 2, color:'primary.main' }}>
            Sales Trend
          </Typography>
          <ResponsiveContainer width='100%' height={300}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
        </Paper>
      </Grid>
    




    <Grid item xs={11} >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <div className="sales-breakdown">
            <Typography variant="h4" sx={{ marginBottom: 2, color:'primary.main' }}>
              Recent Orders
            </Typography>
            <div className="chart" style={{ maxHeight: '400px', overflowY: 'auto' , backgroundColor:'#f3f3f3', padding:'10px'}}>
            {soldProducts.map((productSold, index) => (
        <div key={index}>
          <h2>Order {index + 1}</h2>
          {productSold.products.map((product, productIndex) => (
            <div key={productIndex}>
              <p>Product Name: {product.name}</p>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))}
          <p>
            Order Date: {productSold.orderDate && productSold.orderDate.toDate().toString()}
          </p>
           <p>Shipping Address: {JSON.stringify(productSold.shippingAddress)}</p>
          <p>Payment Information: {JSON.stringify(productSold.paymentInformation)}</p>
        </div>
      ))}
            </div>
          </div>
        </Paper>
      </Grid>

      </Grid>
    </div>
      
    </>
  );
};

export default DashBoardContent;

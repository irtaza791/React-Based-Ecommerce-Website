import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDocs, collection } from '@firebase/firestore';
import { auth, firestore } from '../../firebase';
import { TextField, Typography, Button, Box , Divider} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import { styled } from '@mui/system';
import { deleteDoc } from 'firebase/firestore';

const EditProductsContent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'products'));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
      setFilteredProducts(products);
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (name) => {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
    if (!confirmation) {
      return;
    }

    try {
      const productRef = doc(firestore, 'products', name);
      console.log('Product reference:', productRef);  // Log the product reference to see if it's correct
  
      await deleteDoc(productRef);
       // Confirm that the product was deleted
  
      const updatedProducts = products.filter(product => product.name !== name);
      
      console.log(`Updated products: ${updatedProducts}`); // Log the updated products list to confirm that the product was removed
  
      setProducts(updatedProducts);
      setFilteredProducts(filteredProducts.filter(product => product.name !== name));
      console.log('Product has been deleted');
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchValue) ||
        product.price.toString().includes(searchValue)
      );
    });
    setFilteredProducts(filtered);
  };
  const StyledBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gap: 2,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 2,
      alignItems: 'center',
      marginTop:'20px',
      alignItems: 'center',
      
    },
  }));
 
  return (
    <Box>
      <Typography variant="h1">All Products</Typography>

      <Box sx={{ mt: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search Products"
          onChange={handleSearch}
          fullWidth
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
          mt: 2,
          gap: 2,
          alignItems: 'center',
          fontWeight: 'bold',
         
        }}
      >
        <Typography>Total: {products.length}</Typography>
        <Typography>Product Name</Typography>
        <Typography>Price</Typography>
        <Typography align='center' >Edit</Typography>
        <Typography align='center'>Remove</Typography>
      </Box>

      <ul style={{width:'100%'}}>
        {filteredProducts.map((product) => (
          <StyledBox
            key={product.name}
           
          >
            <img
              style={{ width: '50px', height: '50px' }}
              src={product.cover}
              alt=""
            />
            <Typography>{product.name}</Typography>
            <Typography>{product.price}</Typography>
            <Button variant="outlined" component={RouterLink} to={`/product/${product.name}/${product.id}`}>Edit</Button>
            <Button variant="outlined" onClick={() => deleteProduct(product.name)}>Delete</Button>

          </StyledBox>
         
        ))}
      </ul>
    </Box>
  );
};

export default EditProductsContent;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteDoc, addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase';
import { Box, Button, Container, Grid, IconButton, Rating, TextField, Typography, Card } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import React from 'react';
import Navbar from '../header/Navbar';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link as RouterLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

const EachProductPage= () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [authUser, setAuthUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [userUid, setUserUid] = useState("")
  const history = useHistory();
  const [isSettingPriceTarget, setIsSettingPriceTarget] = useState(false);
  const [priceTarget, setPriceTarget] = useState('');
  const [favorites, setFavorites] = useState([]);

   useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        const adminUid = '4BPLKYa8PkUOSfP9Qnmau45ZC173';
        setIsAdmin(user.uid === adminUid);
        setUserUid(user.uid)
      } else {
        setAuthUser(null);
        setIsAdmin(false);
      }
    });
    return () => {
      listen();
    };
  }, []);
  

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userUid) {
        const favoritesSnapshot = await getDocs(collection(firestore, "userdata", userUid, "favouriteitems"));
        const favorites = favoritesSnapshot.docs.map((doc) => doc.data().productId);
        setFavorites(favorites);
      }
    };

    fetchFavorites();
  }, [userUid]);

  const handleFavorite = async (product) => {
    try {
      const favoritesRef = collection(firestore, "userdata", userUid, "favouriteitems");
      const favoriteSnapshot = await getDocs(favoritesRef);
      const existingProduct = favoriteSnapshot.docs.find((doc) => doc.data().productId === product.id);

      if (existingProduct) {
        // If the product is already a favorite, remove it
        await deleteDoc(doc(favoritesRef, existingProduct.id));
        setFavorites(favorites.filter((productId) => productId !== product.id));
      } else {
        // If the product is not a favorite, add it
        await addDoc(favoritesRef, {
          productId: product.id,
          name: product.name,
          price: product.price,
          cover: product.cover,
          ratings: product.ratings,
          discount: product.discount,
        });
        setFavorites([...favorites, product.id]);
      }
    } catch (e) {
      console.log(e);
    }
  };


useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(firestore, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct(data);
        setEditedProduct({ ...data });
      } else {
        console.log(id)
        console.log('No such document!');
      }
    }
    fetchProduct();
  }, [id]);
  
    if (!product) {
      return <div>Loading...</div>;
    }
      // Function to handle setting price target
  const handleSetPriceTarget = async (event) => {
    event.preventDefault();
    try {
      const priceTargetRef = collection(firestore, 'userdata', userUid, 'priceTargets');
      await addDoc(priceTargetRef, {
        productId: product.id,
        priceTarget: priceTarget,
        productName: product.name,
        productCover: product.cover,
        productPrice: product.price,
      });
      setIsSettingPriceTarget(false);
      alert('Price target set successfully!');
    } catch (error) {
      console.error('Error setting price target:', error);
    }
  };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    };
    const handleEditSubmit = async (event) => {
      event.preventDefault();
      try {
        const productRef = doc(firestore, 'products', id);
        await setDoc(productRef, editedProduct);
        setProduct(editedProduct);
        console.log('Product edited successfully!');
      } catch (error) {
        console.error('Error editing product:', error);
      }
    };

    const handleSubmit = async (event, product, shouldRedirect = false) => {
      event.preventDefault();

      try {
          // Create the userdata collection and cart document if they don't exist
          const userDataRef = doc(firestore, "userdata", userUid);
          await setDoc(userDataRef, {}, { merge: true });
          const cartRef = doc(firestore, "userdata", userUid, "cart", product.id);
          await setDoc(cartRef, {}, { merge: true });
          // Check if the product already exists in the cart
          const cartSnapshot = await getDocs(collection(firestore, "userdata", userUid, "cart"));
          const existingProduct = cartSnapshot.docs.find(doc => doc.data().productId === product.id);
          if (existingProduct) {
              const docRef = doc(firestore, "userdata", userUid, "cart", existingProduct.id);
              await setDoc(docRef, { ...existingProduct.data(), quantity: existingProduct.data().quantity + 1 });
          } else {
              await setDoc(cartRef, {
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  cover: product.cover,
                  quantity: 1
              });
          }
         
          if (shouldRedirect) {
            history.push("/checkout");
            
          } else{
            alert("Product added to cart successfully!");
          }
      } catch (e) {
          console.log(e)
          alert("An error occurred while adding the product to cart!");
      }
  };

    return (
        
      <div style={{width:'100%', backgroundColor: '#1e1e1e'}}>
      <Navbar />
      <Container sx={{ backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh' }}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img 
                style={{ maxWidth: '100%', height: 'auto' }} 
                src={product.cover} 
                alt={product.name} 
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
           


            {isAdmin ? (
                <Card elevation={3} sx={{ p: 3,  backgroundColor: '#000', color: 'white' }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>Admin Edit Form</Typography>
                
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
                  {product.name}
                  <IconButton aria-label="add to wishlist" sx={{ color: 'white' }}>
                    <FavoriteBorder />
                  </IconButton>
                </Typography>
                
                <TextField
                  fullWidth
                  label="Product Price"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ mb: 2, color: 'white' }}
                  inputProps={{ style: { color: 'white' }}}
                />
                
                <TextField
                  fullWidth
                  label="Product Description"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ mb: 2, color: 'white' }}
                  inputProps={{ style: { color: 'white' }}}
                />
                
                <TextField
                  fullWidth
                  label="Product Image URL"
                  name="cover"
                  value={editedProduct.cover}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ mb: 2, color: 'white' }}
                  inputProps={{ style: { color: 'white' }}}
                />
                
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                  onClick={handleEditSubmit}
                >
                  Save Changes
                </Button>
              </Card>
            ):(
              <Box>

            
                 <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#fff' }}>
              {product.name}
              <IconButton onClick={() => handleFavorite(product)} aria-label="add to wishlist" sx={{color: favorites.includes(product.id) ? 'red' : '#fff' }}>
                <FavoriteBorder />
              </IconButton>
            </Typography>
    
            <Typography variant="h5" gutterBottom color="primary">
              ${product.price}
            </Typography>
    
            <Rating value={parseInt(product.ratings)} readOnly />
    
            <Typography variant="body1" gutterBottom sx={{ color: '#fff' }}>
              <p className='eProductDesc'>{product.description}</p>
            </Typography>
    
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mb: 1 }}
                onClick={(event) => handleSubmit(event, product)}
              >
                Add to Cart
              </Button>
    
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth
                component={RouterLink}
                to={`/checkout`}
                onClick={(event) => handleSubmit(event, product, true)}

                
              >
                Buy Now
              </Button>

            </Box>
            <Box sx={{ mt: 2 }}>
      <Button 
        variant="contained" 
        color="secondary" 
        fullWidth 
        sx={{ mb: 1 }}
        onClick={() => setIsSettingPriceTarget(true)}
      >
        Set a Price Target
      </Button>
      {isSettingPriceTarget && (
        <form onSubmit={handleSetPriceTarget}>
          <TextField
            fullWidth
            label="Price Target"
            name="priceTarget"
            value={priceTarget}
            onChange={(event) => setPriceTarget(event.target.value)}
            variant="outlined"
            sx={{ mb: 2, color: 'white' }}
            inputProps={{ style: { color: 'white' }}}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Set Target
          </Button>
        </form>
      )}
    </Box>
            </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
    
      );
};

export default EachProductPage;

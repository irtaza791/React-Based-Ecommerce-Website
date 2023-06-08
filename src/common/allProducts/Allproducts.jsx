import React, { useEffect, useState } from "react"
import { auth } from '../../firebase';
import { setDoc, doc, getDocs, collection } from "@firebase/firestore"
import { firestore } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Typography from '@mui/material/Typography';
import Navbar from "../header/Navbar";
import { Box, TextField, Button, Grid, Select, MenuItem,Rating } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'



const Allproducts = () => {


    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [authUser, setAuthUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userUid, setUserUid] = useState("")
    const [sortedProducts, setSortedProducts] = useState([]);

    const [filter, setFilter] = useState("price");
    const [sort, setSort] = useState("asc");
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
      };
    
      const handleSortChange = (event) => {
        setSort(event.target.value);
      };

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(firestore, "products"));
            const products = querySnapshot.docs.map(doc => doc.data());
            setProducts(products);
            
        }
        fetchProducts();
    }, []);

    useEffect(() => {
      let sorted = [...products].filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => {
        if (filter === "price") {
            return sort === "asc" ? a.price - b.price : b.price - a.price;
        }
        if (filter === "rating") {
          console.log("a.rating"+a.ratings)
          console.log("b.rating"+b.ratings)
          return sort === "asc" ? a.ratings - b.ratings : b.ratings - a.ratings;
        }
        return 0;
      });
      setSortedProducts(sorted);
    }, [products, filter, sort, searchQuery]);


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


    const handleSubmit = async (event, product) => {
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
            alert("Product added to cart successfully!");
        } catch (e) {
            console.log(e)
            alert("An error occurred while adding the product to cart!");
        }
    };
    

    return (
      <>
  <Navbar />
  <Box
  className="allProductPage"
  sx={{
    p: 4,
    backgroundColor: '#1e1e1e',
    color: '#fff'
  }}
>
<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="h4" sx={{ mb: 3, color: '#fff' }}>Our Products</Typography>

    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{
        mb: 3,
        backgroundColor: '#2f2f2f',
        color: '#fff',
        width: '50%',
        ['@media (max-width:780px)']: {
          width: '100%',
        },
      }}
      InputProps={{
        style: {
          color: '#fff'
        }
      }}
    />

<Box sx={{ width: '50%', mb: 3, display: 'flex', justifyContent: 'space-between', ['@media (max-width:780px)']: { flexDirection: 'column', width: '100%', gap: 2 } }}>
      <Select
        variant="outlined"
        value={filter}
        onChange={handleFilterChange}
        style={{
          color: '#fff',
          backgroundColor: '#2f2f2f'
        }}
      >
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
      </Select>

      <Select
        variant="outlined"
        value={sort}
        onChange={handleSortChange}
        style={{
          color: '#fff',
          backgroundColor: '#2f2f2f'
        }}
      >
        <MenuItem value="asc">Low to High</MenuItem>
        <MenuItem value="desc">High to Low</MenuItem>
      </Select>

    </Box>
  </Box>

  <Grid container spacing={2}>
    {sortedProducts.map((product) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            height: '100%', 
            backgroundColor: '#2f2f2f',
            p: 2,
            borderRadius: 2,
            color: '#fff',
            transition: 'transform 0.2s ease-in-out',
            ':hover': {
              transform: 'scale(1.02)'
            }
          }}
        >
              <Box
            sx={{
              width: '100%',
              height: 0,
              paddingTop: '75%', 
              overflow: 'hidden',
              position: 'relative',
              mb: 2
            }}
          >
               <img
              src={product.cover}
              alt=""
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            </Box>
            <Typography variant="h6">{product.name}</Typography>
          <Typography>£{product.price}</Typography>
          
          <Rating name="read-only" value={parseInt(product.ratings)} readOnly />
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to={`/product/${product.name}/${product.id}`}
            >
              Buy Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => handleSubmit(event, product)}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
</Box>
</>



    )
}

export default Allproducts
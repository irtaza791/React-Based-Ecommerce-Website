import React, { useEffect, useState } from "react";
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { firestore } from '../../firebase';
import Slider from "react-slick";
import { deleteDoc, addDoc, doc, setDoc, getDocs, collection } from "@firebase/firestore"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Button, Card, CardMedia, CardContent, Rating } from '@mui/material';

const FlashCard = () => {

  const [authUser, setAuthUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userUid, setUserUid] = useState("");
  const [products, setProducts] = useState([]);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        const adminUid = '4BPLKYa8PkUOSfP9Qnmau45ZC173';
        setUserUid(user.uid);
        setIsAdmin(user.uid === adminUid);
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




  const handleSubmit = async (event, product) => {
    event.preventDefault();

    try {

      if(authUser){
        // Create the userdata collection and cart document if they don't exist
      const userDataRef = doc(firestore, "userdata", userUid);
      await setDoc(userDataRef, {}, { merge: true });
      const cartRef = doc(firestore, "userdata", userUid, "cart", product.id);
      await setDoc(cartRef, {}, { merge: true });

      // Check if the product already exists in the cart
      const cartSnapshot = await getDocs(collection(firestore, "userdata", userUid, "cart"));
      const existingProduct = cartSnapshot.docs.find((doc) => doc.data().productId === product.id);

      if (existingProduct) {
        const docRef = doc(firestore, "userdata", userUid, "cart", existingProduct.id);
        await setDoc(docRef, { ...existingProduct.data(), quantity: existingProduct.data().quantity + 1 });
      } else {
        await setDoc(cartRef, {
          productId: product.id,
          name: product.name,
          price: product.price,
          cover: product.cover,
          quantity: 1,
        });
      }

      alert("Product added to cart successfully!");

      }else{
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        let existingProductIndex = cartItems.findIndex(item => item.productId === product.id);

        if (existingProductIndex >= 0) {
            // product already in cart, just increase the quantity
            cartItems[existingProductIndex].quantity += 1;
        } else {
            // product not in cart, add it
            cartItems.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                cover: product.cover,
                quantity: 1,
            });
        }

        // update the cart items in local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        alert("Product added to cart successfully!");

      }
      
    } catch (e) {
      console.log(e);
      alert("An error occurred while adding the product to cart!");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const products = querySnapshot.docs.map((doc) => doc.data());
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const settings = {

    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} >
      {products.slice(0, 6).map((product) => (
        <Box key={product.id} sx={{ maxWidth: 300, borderRadius: '13px', border: '1px solid #4a5d67 ', marginLeft: '17px' }}>
          <Card sx={{ backgroundColor: 'transparent', color: 'white' }}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia component="img" height="140" image={product.cover} alt={product.name} />
              <Box sx={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', padding: '2px 8px' }}>
                
              </Box>
              <Box sx={{ position: 'absolute', bottom: 1, right: 1, backgroundColor: 'rgba(0,0,0,.5)', color: '#fff', display: 'flex', alignItems: 'center', }}>
                <Button
                  onClick={() => handleFavorite(product)}
                  style={{ color: favorites.includes(product.id) ? 'red' : '#fff' }}
                >
                  <i className='fa fa-heart'></i>
                </Button>
              </Box>
            </Box>
            <CardContent>
              <Typography variant="h6" component="div">{product.name}</Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ marginRight: 1 }}>rating {product.ratings}</Typography>
                <Rating name="read-only" value={parseInt(product.ratings)} readOnly />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">${product.price}.00</Typography>
                <Button variant="contained" color="secondary" onClick={(event) => handleSubmit(event, product)}>
                  <i className='fa fa-plus'></i>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Slider>
  );
};

export default FlashCard;




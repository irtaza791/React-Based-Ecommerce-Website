import React, { useEffect, useState } from "react"
import { auth } from '../../firebase';
import { getDocs, collection, onSnapshot } from "@firebase/firestore"
import { firestore } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom'




import { AppBar, Toolbar, IconButton, Typography, Button, Badge, Box, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';






import eeslogo from '../assets/eeslogo.png'
const Navbar = () => {
    const [MobileMenu, setMobileMenu] = useState(false)
    const [products, setProducts] = useState([]);
    const [userUid, setUserUid] = useState("")
    const [authUser, setAuthUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchorEl(event.currentTarget);
      };
      const handleMobileMenuClose = () => {
        setMobileMenuAnchorEl(null);
      };
      const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
    window.addEventListener("scroll", function () {
        const search = this.document.querySelector(".search")
    })

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
              let updatedProducts = [];
              if(authUser){
                  const cartRef = collection(firestore, "userdata", userUid, "cart");
                  const querySnapshot = await getDocs(cartRef);
                  const products = querySnapshot.docs.map(doc => doc.data());
                  setProducts(products);
  
                  onSnapshot(cartRef, (snapshot) => {
                      updatedProducts = snapshot.docs.map(doc => doc.data());
                      setProducts(updatedProducts);
                  });
  
              } else {
                  // Fetch the items from local storage for unauthenticated user
                  const localCart = localStorage.getItem('cartItems');
                  if (localCart) {
                      updatedProducts = JSON.parse(localCart);
                  } else {
                      console.log('No items in local storage');
                  }
                  console.log(updatedProducts); // check if this logs the correct products
              }
  
              setProducts(updatedProducts);
  
          } catch (error) {
              console.error(error);
          }
      };
      fetchProducts();  // Fetch products regardless of whether user is authenticated
  }, [firestore, userUid, authUser]);
  
  const userSignOut = () => {
    signOut(auth).then(() => {
      
      console.log('sign out successful')
    }).catch(error => console.error(error))
  }

  return (
    <>
  <AppBar position="static" sx={{backgroundColor:'black'}}>
    <Toolbar>
      <Box display="flex" alignItems="center" flexGrow={1}>
        <Button component={RouterLink} to="/">
        <img src={eeslogo} alt="" height="50" />
          </Button>
        <Typography variant="h6" component="div" sx={{ ml: 2 }}>
          Elite Equine Solution
        </Typography>
      </Box>
      
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Button color="inherit" component={RouterLink} to="/">Home</Button>
        <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
        <Button color="inherit" component={RouterLink} to="/contactus">Contact Us</Button>

        <IconButton color="inherit" component={RouterLink} to="/cart">
          <Badge badgeContent={products.length} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <IconButton color="inherit" component={RouterLink} to="/admin">
          <AccountCircle />
        </IconButton>
      </Box>

          {/* Cart icon visible only on small screens */}
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton color="inherit" component={RouterLink} to="/cart">
            <Badge badgeContent={products.length} color="error">
                <ShoppingCart />
            </Badge>
        </IconButton>
    </Box>
      
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </Toolbar>

    <Menu
      id="menu-mobile"
      anchorEl={mobileMenuAnchorEl}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      


      <MenuItem onClick={handleMobileMenuClose} component={RouterLink} to="/contactus">Contact Us</MenuItem>
      <MenuItem onClick={handleMobileMenuClose} component={RouterLink} to="/cart">
        Cart
        {products.length > 0 && (
          <Badge badgeContent={products.length} color="error" sx={{ ml: 2 }}>
            <ShoppingCart />
          </Badge>
        )}
      </MenuItem>
      {authUser && (
        <>
            <MenuItem onClick={handleMobileMenuClose} component={RouterLink} to="/admin">Dashboard</MenuItem>
            <MenuItem onClick={userSignOut} component={RouterLink} to="/">Sign out</MenuItem>
            <MenuItem onClick={handleMobileMenuClose} component={RouterLink} to="/profile">Profile Page</MenuItem>
        </>
  
      )}
      {!authUser && (
        <>
          <MenuItem component={RouterLink} to="/admin">Sign In</MenuItem>
        </>
    
      ) }



      <MenuItem onClick={handleMobileMenuClose} component={RouterLink} to="/">Home</MenuItem>
    </Menu>
  </AppBar>

        {/* <Button variant="contained" color="primary" onClick={() => userSignOut()}>
         Sign out
        </Button> */}
</>
  )
}

export default Navbar
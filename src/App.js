import React, { useState } from 'react';
import Header from "./common/header/Header";
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pages from "./pages/Pages";
import Data from './components/flashDeals/Data';
import Admin from './common/adminpanel/Admin';
import SignUp from './common/adminpanel/SignUp';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import AuthDetails from './common/adminpanel/AuthDetails';
import Cart from './common/cart/Cart';
import { Checkout } from './common/checkout/Checkout';
import Allproducts from './common/allProducts/Allproducts';
import EachProductPage from './common/allProducts/EachProductPage';
import ProfilePage from './components/profile/ProfilePage';
import ContactUs from './components/contactUs/ContactUs';
import Footer from './common/footer/Footer';
import AboutUs from './common/about/AboutUs';
import PrivacyPolicy from './common/about/PrivacyPolicy';

function App() {


  return (
    <ThemeProvider theme={theme}>
    <div >


      <Router>
       
        <Switch>
          <Route path="/" exact>
            <Pages />

          </Route>

          <Route path="/cart" exact>
            <Cart   />

          </Route>
          <Route path="/checkout" exact>
            <Checkout/>
          </Route>

          <Route path='/admin' >
            <Admin />
          </Route>
          <Route path='/auth'>
            <AuthDetails />
          </Route>
          <Route path='/signup'>
            <SignUp/>
          </Route>
          <Route path='/products'>
            <Allproducts />
          </Route>
          <Route path='/product/:id'>
            <EachProductPage />
          </Route>
          <Route path='/profile'>
            <ProfilePage />
          </Route>
          <Route path='/contactus'>
            <ContactUs />
          </Route>
          <Route path='/aboutus'>
            <AboutUs />
          </Route>
          <Route path='/privacyandpolicy'>
            <PrivacyPolicy />
          </Route>


        </Switch>
      </Router>
      
      
    </div>
    </ThemeProvider>
  );
}

export default App;
/* https://wireframe.cc/RhJqd4 */
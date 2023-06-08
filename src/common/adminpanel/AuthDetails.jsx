import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import DashBoardContent from './DashBoardContent';
import AnalyticsContent from './AnalyticsContent';
import AddProductsContent from './AddProductsContent';
import EditProductsContent from './EditProductsContent';
import EditStoreContent from './EditStoreContent';
import Profile from './Profile';
import Orders from './Orders';
import CustomerCart from './CustomerCart';
import Favourites from './Favourites';
import PriceTargets from './PriceTargets';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StoreIcon from '@mui/icons-material/Store';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { styled } from '@mui/system';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        const adminUid = '4BPLKYa8PkUOSfP9Qnmau45ZC173';
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

  const [activeMenu, setActiveMenu] = useState('Profile');
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  }));
  const MainList = styled(List)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      maxWidth:'390px',
      overflow:'auto',

    },
  }));

  const ContentBox = styled('div')(({ theme }) => ({
    width: '70%',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  }));

  return (
    <>
      <MainBox>
        <MainList >
          {isAdmin ? (
            <>
              <ListItem
                button
                selected={activeMenu === 'Dashboard'}
                onClick={() => handleMenuClick('Dashboard')}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                selected={activeMenu === 'Analytics'}
                onClick={() => handleMenuClick('Analytics')}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItem>
              <ListItem
                button
                selected={activeMenu === 'Add Products'}
                onClick={() => handleMenuClick('Add Products')}
              >
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Add Products" />
              </ListItem>
              <ListItem
                button
                selected={activeMenu === 'Edit Store'}
                onClick={() => handleMenuClick('Edit Store')}
              >
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Store" />
              </ListItem>
              <ListItem
                button
                selected={activeMenu === 'Edit Products'}
                onClick={() => handleMenuClick('Edit Products')}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Products" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                selected={activeMenu === 'Profile'}
                onClick={() => handleMenuClick('Profile')}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                selected={activeMenu === 'Orders'}
                onClick={() => handleMenuClick('Orders')}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
              <ListItem
                button
                selected={activeMenu === 'Cart'}
                onClick={() => handleMenuClick('Cart')}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Cart" />
              </ListItem>
              <ListItem
                button
                selected={activeMenu === 'Favourites'}
                onClick={() => handleMenuClick('Favourites')}
              >
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Favourites" />
              </ListItem>
              <ListItem
                button
                selected={activeMenu === 'Price Targets'}
                onClick={() => handleMenuClick('Price Targets')}
              >
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Price Targets" />
              </ListItem>
            </>
          )}
        </MainList>
        <ContentBox  className="dashboard__content">
          {activeMenu === 'Dashboard' && <DashBoardContent />}
          {activeMenu === 'Analytics' && <AnalyticsContent />}
          {activeMenu === 'Add Products' && <AddProductsContent />}
          {activeMenu === 'Edit Store' && <EditStoreContent />}
          {activeMenu === 'Edit Products' && <EditProductsContent />}
          {activeMenu === 'Profile' && <Profile />}
          {activeMenu === 'Orders' && <Orders />}
          {activeMenu === 'Cart' && <CustomerCart />}
          {activeMenu === 'Favourites' && <Favourites />}
          {activeMenu === 'Price Targets' && <PriceTargets />}
        </ContentBox>
      </MainBox>
    </>
  );
};

export default AuthDetails;
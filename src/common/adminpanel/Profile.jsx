
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from '../../firebase';

import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, Button, TextField, List, ListItem, ListItemAvatar,ListItemText } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Navbar from '../../common/header/Navbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {getDocs, doc, collection,onSnapshot, setDoc } from "firebase/firestore"; 


const Profile = () => {
    const [authUser, setAuthUser] = useState(null);
  
    const [isAdmin, setIsAdmin] = useState(false);
    const [userUid, setUserUid] = useState("");
    const [userData, setUserData] = useState({});
    const [newUserInfo, setNewUserInfo] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthUser(user)
    
          } else {
            setAuthUser(null);
          }
        })
        return () => {
          listen();
        }
      }, [])



      useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
               
                setAuthUser(user);
                const adminUid = '4BPLKYa8PkUOSfP9Qnmau45ZC173';
                setUserUid(user.uid);
                setIsAdmin(user.uid === adminUid);
              
                const userDataRef = doc(firestore,"userdata",user.uid);
                onSnapshot(userDataRef, (doc) => {
      
                  if (doc.exists) {
                    setUserData(doc.data());
                  } else {
                 
                  }
                });
    
                // New: Fetch the user details from Firestore
                const userInfoRef = doc(firestore, "userdata", user.uid, "userInfo", "details");
                onSnapshot(userInfoRef, (doc) => {
                 
                  if (doc.exists) {
                    setUserData(prevData => ({...prevData, ...doc.data()}));
                  } else {
    
                  }
                });
                
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
        const fetchOrders = async () => {
          const ordersRef = collection(firestore, "userdata", userUid, "orders");
          const querySnapshot = await getDocs(ordersRef);
      
          const userOrders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(userOrders)
      
          setOrders(userOrders);
        };
      
        if (userUid) {
          fetchOrders();
        }
      }, [userUid]);
      

      
      const handleSubmit = async (event)=>{
        event.preventDefault(); // prevent form from refreshing the page
        try{
      
            const userInfoRef = doc(firestore, "userdata", userUid, "userInfo", "details");
            await setDoc(userInfoRef, {...newUserInfo, avatarUrl: newUserInfo.avatarUrl}, { merge: true });
            alert("User info updated successfully!");
            setIsEditMode(false); 
        } catch (e) {
    
            alert(`An error occurred: ${e.message}`);
        }
    }
    function isEmpty(obj) {
        const result = !obj || !obj.name || !obj.about || !obj.location;
    
        return result;
    }
    const avatars = [
      'https://avatars.dicebear.com/v2/avataaars/e83cb6f27e05f64eedc55f17cea730ca.svg',
      'https://avatars.dicebear.com/v2/female/e83cb6f27e05f64eedc55f17cea730ca.svg',
      // ... add more avatar URLs
    ];
  return (
    <>
    <Box>
  
    
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: 3,
      m: 3,
      p: 2,
      borderRadius: 2,
      boxShadow: 1,
      bgcolor: 'background.paper'
    }}>
      {!isEmpty(userData) ?  (
        <>
          <Avatar 
            alt={userData.name || 'User'} 
            src={userData.avatarUrl || ''} 
            sx={{ 
              width: 120, 
              height: 120,
              bgcolor: deepOrange[500],
              color: deepPurple[500],
            }} 
          />
          <Typography variant="h4" component="div" fontWeight="bold">
            {userData.name || 'User'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {userData.email || 'No Email'}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {userData.about || 'No About'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              {userData.location || 'No Location'}
            </Typography>
          </Box>
          {!isEmpty(userData) && !isEditMode && (
      <Box sx={{ m: 3 }}>
        <Button variant="contained" color="primary" onClick={() => setIsEditMode(true)}>
          Edit Profile
        </Button>
      </Box>
    )}
        </>
      ) : (
        <Typography variant="body1" textAlign="center">
          Please login to view your profile
        </Typography>
      )}
    </Box>
    { authUser && (
      <Box sx={{ m: 3 }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          Order History:
        </Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {orders.map((order, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <ShoppingCartIcon />
                </ListItemAvatar>
                <ListItemText primary={order.orderNumber} secondary={`Order No : ${index + 1 } was Purchased on: ${new Date(order.orderDate.toDate().toString())}`} />
              </ListItem>
            ))}
          </List>
      </Box>
    )}
    {(authUser && isEmpty(userData) || isEditMode) && (
      <Box sx={{ m: 3 }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          Update Your Profile:
        </Typography>
        <Typography align='left'>
  Choose Your Gender
</Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
       
       {avatars.map((avatar, index) => (
         <Box>
     
     <Avatar
           key={index}
           src={avatar}
           sx={{ backgroundColor:"black", width: 60, height: 60, cursor: 'pointer' }}
           onClick={() => setNewUserInfo({ ...newUserInfo, avatarUrl: avatar })}
         />
     
         </Box>
     
       ))}
     
     </Box>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newUserInfo.name || ''}
            onChange={(e) => setNewUserInfo({ ...newUserInfo, name: e.target.value })}
          />
          <TextField
            id="about"
            label="About"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newUserInfo.about || ''}
            onChange={(e) => setNewUserInfo({ ...newUserInfo, about: e.target.value })}
          />
            <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newUserInfo.email || ''}
            onChange={(e) => setNewUserInfo({ ...newUserInfo, email: e.target.value })}
          />
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newUserInfo.location || ''}
            onChange={(e) => setNewUserInfo({ ...newUserInfo, location: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save
          </Button>
        </form>
      </Box>
    )}


</Box>

    </>
  )
}

export default Profile
import React from 'react';
import { Box, Typography } from '@mui/material';
import Footer from '../footer/Footer';
import Navbar from '../header/Navbar';

const PrivacyPolicy = () => {
  return (
    <>
    <Navbar/>
    
    <Box sx={{ m: 5 }}>
      <Typography variant="h2" gutterBottom>
        Privacy Policy for Elite Equine Solution
      </Typography>
      <Typography variant="h5" gutterBottom>
        At Elite Equine Solution, accessible from www.eliteequinesolution.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Elite Equine Solution and how we use it.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Log Files
      </Typography>
      <Typography variant="body1" gutterBottom>
        Elite Equine Solution follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Cookies and Web Beacons
      </Typography>
      <Typography variant="body1" gutterBottom>
        Like any other website, Elite Equine Solution uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Privacy Policies
      </Typography>
      <Typography variant="body1" gutterBottom>
        You may consult this list to find the Privacy Policy for each of the advertising partners of Elite Equine Solution.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Online Privacy Policy Only
      </Typography>
      <Typography variant="body1" gutterBottom>
        This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Elite Equine Solution. This policy is not applicable to any information collected offline or via channels other than this website.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Consent
      </Typography>
      <Typography variant="body1" gutterBottom>
        By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
      </Typography>
    </Box>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;

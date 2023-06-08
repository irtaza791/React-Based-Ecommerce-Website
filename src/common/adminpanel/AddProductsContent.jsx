import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../firebase';
import { doc, setDoc, getDocs, collection } from "@firebase/firestore"
import CsvReader from 'react-csv-reader';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCsvReader = styled(CsvReader)({
  marginBottom: '10px',
});
const AddProductsContent = () => {
    const [parsedData, setParsedData] = useState([]);
    const ref = collection(firestore, "products");

    const handleFile = (data, fileInfo) => {
        // Extract the headers from the CSV data
        const headers = data[0];
    
        // Remove the headers from the CSV data
        data.shift();
    
        // Parse the CSV data based on the headers
        const parsedData = data.map((row) => {
          const obj = {};
          headers.forEach((header, index) => {
            // CHECK IF HEADER IS NOT EMPTY
            if (header !== ""){
              obj[header] = row[index];
            }
           
            
          });
          console.log(obj)
          return obj;
        });
    
        // Store the parsed data in the state
        setParsedData(parsedData);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Do something with the parsed data, such as sending it to the server
        console.log(parsedData);
        try {
          for (let i = 0; i < parsedData.length; i++) {
            const product = parsedData[i];
            const docId = product.name;
            setDoc(doc(ref, docId), product);
          }
          alert("Data uploaded successfully!");
    
        } catch (e) {
          console.log(e)
    
        }
    
      };
  return (
    <Grid container   style={{ minHeight: '100vh', margin:'auto' }}>
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
          <Typography variant="h4" component="h2" align="center">Add Products</Typography>
          <StyledCsvReader onFileLoaded={handleFile} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Upload CSV</Button>
        </Paper>
      </Box>
    </Grid>
  </Grid>
   
  )
}

export default AddProductsContent
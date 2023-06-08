import React, { useState } from 'react';

const EditStoreContent = () => {
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');

  const handleStoreNameChange = (event) => {
    setStoreName(event.target.value);
  };

  const handleStoreDescriptionChange = (event) => {
    setStoreDescription(event.target.value);
  };

  const handleSaveChanges = () => {
    // Handle saving the changes to your database or storage
    console.log('Store Name:', storeName);
    console.log('Store Description:', storeDescription);
  };

  return (
    <div>
      <h1>Coming soon...</h1>

   
   
    </div>
  );
};

export default EditStoreContent;

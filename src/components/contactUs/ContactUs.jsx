import React, { useEffect, useState } from 'react';
import Navbar from '../../common/header/Navbar';
import { Container, TextField, Button, Box, Typography, Card, Grid, Paper, Divider } from '@mui/material';
import { firestore } from '../../firebase';
import { auth } from '../../firebase';
import { setDoc, doc, collection, onSnapshot, deleteDoc } from "@firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import Footer from '../../common/footer/Footer';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [authUser, setAuthUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                setIsAdmin(user.uid === '4BPLKYa8PkUOSfP9Qnmau45ZC173');
            } else {
                setAuthUser(null);
                setIsAdmin(false);
            }
        });

        const formRef = collection(firestore, "forms");
        const unsubscribe = onSnapshot(formRef, (snapshot) => {
            let fetchedResponses = [];
            snapshot.forEach((doc) => {
                fetchedResponses.push({ id: doc.id, ...doc.data() });
            });
            setResponses(fetchedResponses);
        });

        return () => {
            listen();
            unsubscribe();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formRef = collection(firestore, "forms");
        const formDocRef = doc(formRef);
        await setDoc(formDocRef, {
            name: name,
            email: email,
            message: message
        })

        setName('');
        setEmail('');
        setMessage('');
    };

    const handleResponseComplete = async (responseId) => {
        const docRef = doc(firestore, "forms", responseId);
        await deleteDoc(docRef);
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{marginBottom:'100px'}}>
            <Typography variant='h1' align='center'>
                            Form Queries
                        </Typography>
                {isAdmin ? (
                    <Grid container spacing={2}>
                        
                        {responses.map((response) => (
                            <Grid item xs={12} key={response.id}>
                                <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {response.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="body1">
                                            {response.email}
                                        </Typography>
                                        <Divider orientation="vertical" flexItem />
                                        <Typography variant="body2" sx={{ pl: 2 }}>
                                            {response.message}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                        <Button variant="contained" color="primary" onClick={() => window.location = `mailto:${response.email}`}>
                                            Reply
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleResponseComplete(response.id)}>
                                            Query Solved
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Card elevation={3} sx={{ p: 3, marginTop: 3 }}>
                        <Typography variant="h4" component="h1" gutterBottom align="center">
                            Contact Us
                        </Typography>
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </Card>
                )}
            </Container>
            <Footer/>
        </div>
    );
};

export default ContactUs;

import React from 'react';
import { auth, firestore } from '../../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { Box, TextField, Button, List, ListItem, Typography, Card, CardContent, Paper, Divider } from '@mui/material';

import { Rating } from '@mui/material';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const FeedbackItem = ({ feedback }) => (
    <ListItem>
      <Paper sx={{ p: 2, width: '100%' }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {feedback.text}
        </Typography>
        <Typography variant='subtitle2' sx={{ mb: 1 }}>
          {feedback.username}
        </Typography>
        <Rating name="read-only" value={feedback.rating} readOnly />
      </Paper>
    </ListItem>
  );
  const FeedbackList = ({ feedbacks }) => (
    <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
      {feedbacks && feedbacks.map(feedback =>
        <FeedbackItem key={feedback.id} feedback={feedback} />
      )}
    </List>
  );

const FeedbackSection = () => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(2);
    const db = firestore;
    const feedbacksRef = collection(db, "feedbacks");
    const feedbacksQuery = query(feedbacksRef, orderBy('timestamp')); // Change here
    const [feedbacks] = useCollectionData(feedbacksQuery, { idField: 'id' });
    const [authUser, setAuthUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [totalFeedbackCount, setTotalFeedbackCount] = useState(0);
    const [totalRatingSum, setTotalRatingSum] = useState(0);
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
    useEffect(() => {
        if (feedbacks) {
          setTotalFeedbackCount(feedbacks.length);
          setTotalRatingSum(feedbacks.reduce((total, feedback) => total + feedback.rating, 0));
        }
      }, [feedbacks]);
      const averageRating = totalFeedbackCount ? totalRatingSum / totalFeedbackCount : 0;
 
    const addFeedback = async (e) => {
        e.preventDefault();
        let email = authUser.email;
        let newname = email.split('@')[0]; 
        const newFeedback = { text, rating, user: authUser.uid, username: newname, timestamp: serverTimestamp() }; // Store the uid with the feedback
        setText('');
    
        try {
          await addDoc(feedbacksRef, newFeedback);
        } catch (e) {
          console.error("Error adding feedback: ", e);
        }
    };

    return (
        <Box>
        <Card sx={{ mb: 4, p: 2 }}>
          <CardContent>
            <Typography variant="h3"  gutterBottom>
              Community Feedback
            </Typography>
            <Box  sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Average Rating:
              </Typography>
              <Rating name="average-rating" value={averageRating} precision={0.1} readOnly sx={{ mx: 1 }} />
              <Typography variant="subtitle1">
                {totalFeedbackCount} feedbacks
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <FeedbackList feedbacks={feedbacks} />
            {authUser ? (
              <form onSubmit={addFeedback}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Share your feedback"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                  <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
                    Post
                  </Button>
                </Box>
              </form>
            ):(
                <Typography variant='h5'sx={{marginTop:'10px'}}>
                    Register to give feedback.
                </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    );
};

export default FeedbackSection;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get('/api/comments/')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
  	event.preventDefault();
  	const token = localStorage.getItem('token');
	axios.post('/api/comments/create/', {
  		text: newComment
	}, {
  		headers: {
    			Authorization: `Bearer ${token}`,
  		}
	})
  	.then(response => {
    		setComments([...comments, response.data]);
    		setNewComment('');
  	})
  	.catch(error => {
    		console.log(error.response.data);
  	});
   };

const handleCommentDelete = (commentId) => {
  const token = localStorage.getItem('token');
  axios.delete(`/api/comments/${commentId}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then(() => {
      setComments(comments.filter(comment => comment.id !== commentId));
    })
    .catch(error => {
      console.log(error);
    });
};


  return (
    <div>
      <form onSubmit={handleCommentSubmit} sx={{ m: 2 }}>
        <TextField 
        	label="New Comment" 
        	value={newComment} 
        	onChange={handleCommentChange}
        	sx={{
        		m: 3
        	}} 
        />
        <Button type="submit" sx={{ m: 4 }}>Submit</Button>
      </form>
      {comments.map(comment => (
        <Card key={comment.id} sx={{ m: 2 }}>
          <CardContent>
            <Typography variant="body2" component="p">
              {comment.text}
            </Typography>
            <Button onClick={() => handleCommentDelete(comment.id)}>Delete</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

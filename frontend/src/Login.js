import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const endpoint = '/api/login/';
    const body = { username, password };
    axios.post(endpoint, body, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.access_token);
          navigate('/');
          window.location.reload()
        }else{
          throw new Error('Response status not 200');
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={handleUsernameChange}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type="submit" variant="contained">
        Войти
      </Button>
    </form>
  );
}


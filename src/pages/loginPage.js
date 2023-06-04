import React, { useRef } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { settings } from '../config';
import { Container } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import useNotification from '../hooks/useNotification';
import useUser from '../hooks/useUser';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const loginInput = useRef();
  const passwordInput = useRef();
  const { login } = useUser();
  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const mutation = useMutation(
    (data) => {
      return axios.post(`${settings.apiUrl}/user/login`, data, {
        withCredentials: true,
      });
    },
    {
      onError: (error, variables, context) => {
        openNotification(error.response.data.message, 'error');
      },
      onSuccess: (data, variables, context) => {
        openNotification('You have been successfully logged In', 'success');
        login(data.data.data.user);
        navigate('/');
      },
    }
  );

  const handleClick = () => {
    if (!loginInput.current.value.length || !passwordInput.current.value.length)
      return openNotification('Please fill all inputs', 'error');

    mutation.mutate({
      email: loginInput.current.value,
      password: passwordInput.current.value,
    });
  };

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        Log in
      </Typography>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <TextField label="E-mail" variant="outlined" inputRef={loginInput} />
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          inputRef={passwordInput}
        />
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={handleClick}>
          Log in
        </Button>
      </Grid>
    </Container>
  );
}

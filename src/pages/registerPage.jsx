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

export const RegisterPage = () => {
  const loginInput = useRef();
  const passwordInput = useRef();
  const passwordRepeatInput = useRef();
  const nameInput = useRef()
  const { login } = useUser();
  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const mutation = useMutation(
    (data) => {
      return axios.post(`${settings.apiUrl}/user/signup`, data, {
        withCredentials: true,
      });
    },
    {
      onError: (error, variables, context) => {
        openNotification(error.response.data.message, 'error');
      },
      onSuccess: (data, variables, context) => {
        openNotification('You have been successfully registered', 'success');
        login(data.data.data.user);
        navigate('/');
      },
    }
  );

  const handleClick = () => {
    if (!loginInput.current.value.length || !passwordInput.current.value.length || !nameInput.current.value.length || !passwordRepeatInput.current.value.length)
      return openNotification('Please fill all inputs', 'error');

      if(passwordInput.current.value !== passwordRepeatInput.current.value)
        return openNotification("Passowrds do not match",'error')

    mutation.mutate({
        name: nameInput.current.value,
      email: loginInput.current.value,
      password: passwordInput.current.value,
      passwordConfirm: passwordRepeatInput.current.value
    });
  };

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        Register
      </Typography>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <TextField label="Name" variant="outlined" inputRef={nameInput} />
      </Grid>
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
        <TextField
          label="Confirm password"
          variant="outlined"
          type="password"
          inputRef={passwordRepeatInput}
        />
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={handleClick}>
          Register
        </Button>
      </Grid>
    </Container>
  );
}

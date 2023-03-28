import React from 'react';
import { Container, CircularProgress } from '@mui/material';

export default function LoadingComponent() {
  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Container>
  );
}

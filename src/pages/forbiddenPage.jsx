import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function ForbiddenPage() {
  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Typography variant="h1" align="center" sx={{ fontSize: '2rem' }}>
          403 Forbidden
        </Typography>
        <Typography variant="body1" align="center">
          You are not allowed to see this page
        </Typography>
      </Grid>
    </Container>
  );
}

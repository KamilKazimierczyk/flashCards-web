import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function NotFoundPage() {
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
          Sorry we could not find this page
        </Typography>
        <Typography variant="body1" align="center">
          If you think that the page should exist or it was existing please
          contact us
        </Typography>
      </Grid>
    </Container>
  );
}

import React from 'react';
import { Container } from '@mui/material';
import HotSpot from '../components/HotSpot';

export default function homePage() {
  return (
    <Container sx={{ minHeight: '100vh', pt: 4 }}>
      <HotSpot name="Najnowsze fiszki" url="/flashCard?limit=3" />
      <HotSpot
        name="Najpopularniejsze fiszki"
        url="/flashCard?sort=-favouritesCount&limit=3"
      />
    </Container>
  );
}

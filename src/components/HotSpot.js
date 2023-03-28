import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { settings } from '../config';
import FlashCardItem from './FlashCardItem';
import axios from 'axios';
import LoadingComponent from './LoadingComponent';

export default function HotSpot({ name, url }) {
  const flashCardsQuery = useQuery({
    queryKey: ['flashCards', url],
    queryFn: () =>
      axios.get(`${settings.apiUrl}${url}`).then((res) => res.data),
  });

  if (flashCardsQuery.isLoading) return <LoadingComponent />;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4">{name}</Typography>
      </Grid>
      {flashCardsQuery.data.data.flashCards.map((flashCard) => (
        <Grid item xs={12} md={4} key={flashCard._id} sx={{ p: 1 }}>
          <FlashCardItem item={flashCard} />
        </Grid>
      ))}
    </Grid>
  );
}

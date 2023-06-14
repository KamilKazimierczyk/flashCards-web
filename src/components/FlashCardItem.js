import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function FlashCardItem({ item }) {
  return (
    <Grid
      container
      sx={{ p: 1, border: '1px solid #333', borderRadius: '10px' }}
    >
      <Grid item xs={12}>
        <Typography variant="h5">
          <Link to={`/flashcards/${item._id}`}>{item.name}</Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">{item.description}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body2">{`Languages: ${item.translatedFrom} to ${item.translatedTo}`}</Typography>
      </Grid>
      {/* <Grid
        item
        xs={4}
        sx={{ display: 'flex', gap: '5px', justifyContent: 'end' }}
      >
        <FavoriteBorderIcon />
        <Typography>{item.favouritesCount}</Typography>
      </Grid> */}
    </Grid>
  );
}

import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { settings } from '../config';
import { Container } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function FlashCardPage() {
  let { flashCardId } = useParams();
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'word', headerName: 'Original word', width: 200 },
    { field: 'translation', headerName: 'Translation', width: 200 },
  ];

  const flashCardQuery = useQuery({
    queryKey: ['flashCards', flashCardId],
    queryFn: () =>
      axios
        .get(`${settings.apiUrl}/flashCard/${flashCardId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  if (flashCardQuery.isLoading) return <LoadingComponent />;

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">
            {flashCardQuery.data.data.flashCard.name}
          </Typography>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{`Languages: ${flashCardQuery.data.data.flashCard.translatedFrom} to ${flashCardQuery.data.data.flashCard.translatedTo}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              {flashCardQuery.data.data.flashCard.description}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 1 }}>
            <DataGrid
              rows={flashCardQuery.data.data.flashCard.words}
              columns={columns}
              pageSizeOptions={[5, 10]}
              columnVisibilityModel={{
                id: false,
              }}
              getRowId={(row) => row._id}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

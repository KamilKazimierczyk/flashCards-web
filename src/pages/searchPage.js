import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { settings } from '../config';
import FlashCardItem from '../components/FlashCardItem';
import axios from 'axios';
import { Container } from '@mui/material';
import { Grid, Typography, Button } from '@mui/material';
import FilterComponent from '../components/FilterComponent';
import LoadingComponent from '../components/LoadingComponent';
import { useSearchParams } from 'react-router-dom';
import useUser from '../hooks/useUser';
import AddFlashCard from '../components/AddFlashCard';

export default function SearchPage() {
  const [filters, setFilters] = useState({
    from: 'Wybierz język',
    to: 'Wybierz język',
  });
  const [sort, setSort] = useState('Wybierz sortowanie');
  let [text] = useSearchParams();
  const { user } = useUser();

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const queryKey = ['flashCards'];
  if (text) queryKey.push(`text=${text}`);
  if (sort && sort !== 'Wybierz sortowanie') queryKey.push(`sort=${sort}`);
  if (filters.from && filters.from !== 'Wybierz język')
    queryKey.push(`filterFrom=${filters.from}`);
  if (filters.to && filters.to !== 'Wybierz język')
    queryKey.push(`filterTo=${filters.to}`);

  const queryUrl = `${settings.apiUrl}/flashCard${text ? `&text=${text}` : ''}${
    sort && sort !== 'Wybierz sortowanie' ? `&sort=${sort}` : ''
  }${
    filters.from && filters.from !== 'Wybierz język'
      ? `&translatedFrom=${filters.from}`
      : ''
  }${
    filters.to && filters.to !== 'Wybierz język'
      ? `&translatedTo=${filters.to}`
      : ''
  }`.replace('flashCard&', 'flashCard?');

  const flashCardsQuery = useQuery({
    queryKey: queryKey,
    queryFn: () => axios.get(`${queryUrl}`).then((res) => res.data),
  });

  if (flashCardsQuery.isLoading) return <LoadingComponent />;

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="h4">Flashcards</Typography>
          {user.loggedIn ? (
            <Button
              onClick={handleOpenAdd}
              sx={{
                m: 1,
                display: 'block',
                color: '#fff',
              }}
              variant="contained"
            >
              Add Flash card
            </Button>
          ) : (
            ''
          )}
          <AddFlashCard open={openAdd} handleClose={handleCloseAdd} />
        </Grid>
        <Grid item xs={12}>
          <FilterComponent
            setSort={setSort}
            setFilter={setFilters}
            currentSort={sort}
            filtersObject={filters}
          />
        </Grid>
        {flashCardsQuery.data.data.flashCards.map((flashCard) => (
          <Grid item xs={12} md={4} key={flashCard._id} sx={{ p: 1 }}>
            <FlashCardItem item={flashCard} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

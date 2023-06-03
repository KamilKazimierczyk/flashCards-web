import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settings } from '../config';
import { Button, Container } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useUser from '../hooks/useUser';
import AddTranslationsForFlashCard from '../components/AddTranslationsForFlashCard';
import EditFlashCard from '../components/EditFlashCard';
import useNotification from '../hooks/useNotification';

export default function FlashCardPage() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const { openNotification } = useNotification();
  const queryClient = useQueryClient();
  const { user } = useUser();
  let { flashCardId } = useParams();

  const deleteTranslationMutation = useMutation(
    (data) => {
      return axios.delete(
        `${settings.apiUrl}/flashCard/${flashCardId}/translation/${data.id}`,
        {
          withCredentials: true,
        }
      );
    },
    {
      onError: (error, variables, context) => {
        openNotification(error.response.data.message, 'error');
      },
      onSuccess: (data, variables, context) => {
        openNotification('You have successfully delete Translation', 'success');
        queryClient.invalidateQueries(['flashCards', flashCardId], {
          exact: true,
        });
      },
    }
  );

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'word', headerName: 'Original word', width: 200, editable: true },
    {
      field: 'translation',
      headerName: 'Translation',
      width: 200,
      editable: true,
    },
    {
      field: 'Action',
      headerName: 'Action',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const handleClick = (e) => {
          e.stopPropagation();

          deleteTranslationMutation.mutate({ id: params.id });
        };

        return (
          <Button
            onClick={handleClick}
            sx={{
              m: 1,
              display: 'block',
              color: '#fff',
            }}
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
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

  const updateTranslationMutation = useMutation(
    (data) => {
      return axios.patch(
        `${settings.apiUrl}/flashCard/${flashCardId}/translation/${data.id}`,
        data.body,
        {
          withCredentials: true,
        }
      );
    },
    {
      onError: (error, variables, context) => {
        openNotification(error.response.data.message, 'error');
      },
      onSuccess: (data, variables, context) => {
        openNotification('You have successfully update Translation', 'success');
        queryClient.invalidateQueries(['flashCards', flashCardId], {
          exact: true,
        });
      },
    }
  );

  const updateTranslation = (data, event) => {
    const newValue = event.target.value;
    if (newValue === data.value) return false;

    const dataToSend = { id: data.id, body: {} };
    dataToSend.body[data.field] = newValue;
    console.log(dataToSend);
    updateTranslationMutation.mutate(dataToSend);
  };

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
          {user?.role === 'admin' ||
          user?._id === flashCardQuery.data.data.flashCard.author ? (
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                onClick={handleOpenEdit}
                sx={{
                  m: 1,
                  display: 'block',
                  color: '#fff',
                  marginRight: 'auto',
                }}
                variant="contained"
              >
                Edit flash card
              </Button>
              <Button
                onClick={handleOpenAdd}
                sx={{
                  m: 1,
                  display: 'block',
                  color: '#fff',
                  marginLeft: 'auto',
                }}
                variant="contained"
              >
                Add words
              </Button>
            </Grid>
          ) : (
            ''
          )}
          <AddTranslationsForFlashCard
            open={openAdd}
            handleClose={handleCloseAdd}
            flashCardId={flashCardQuery.data.data.flashCard._id}
          />
          <EditFlashCard
            open={openEdit}
            handleClose={handleCloseEdit}
            flashCard={flashCardQuery.data.data.flashCard}
          />
          <Grid item xs={12} sx={{ marginTop: 1 }}>
            <DataGrid
              rows={flashCardQuery.data.data.flashCard.words}
              columns={columns}
              pageSizeOptions={[5, 10]}
              columnVisibilityModel={{
                id: false,
              }}
              getRowId={(row) => row._id}
              disableRowSelectionOnClick
              isCellEditable={() => {
                return user?.role === 'admin' ||
                  user?._id === flashCardQuery.data.data.flashCard.author
                  ? true
                  : false;
              }}
              onCellEditStop={updateTranslation}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

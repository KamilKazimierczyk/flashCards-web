import React, { useState } from 'react';
import { Modal, Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settings } from '../config';
import useNotification from '../hooks/useNotification';

export default function EditFlashCard({ flashCard, open, handleClose }) {
  const { openNotification } = useNotification();
  const queryClient = useQueryClient();
  const [name, setName] = useState(flashCard.name);
  const [desc, setDesc] = useState(flashCard.description);

  const mutation = useMutation(
    (data) => {
      return axios.patch(
        `${settings.apiUrl}/flashCard/${flashCard._id}`,
        data,
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
        queryClient.invalidateQueries(['flashCards', flashCard._id], {
          exact: true,
        });
        openNotification('Flash Card has been updated', 'success');
        handleClose();
      },
    }
  );

  const handleClick = () => {
    mutation.mutate({ name, description: desc });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    border: '1px solid #ddd',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography variant="h5">Edit Flash card</Typography>
        </Box>
        <Box>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginTop: 2, width: '100%' }}
          />
        </Box>
        <Box>
          <TextField
            label="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            sx={{ marginTop: 2, width: '100%' }}
            multiline
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{ marginTop: 2, width: '100%' }}
            onClick={handleClick}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

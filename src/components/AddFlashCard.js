import React, { useState } from 'react';
import {
  Modal,
  Button,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { settings, languages } from '../config';
import useNotification from '../hooks/useNotification';

export default function AddFlashCard({ open, handleClose }) {
  const { openNotification } = useNotification();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [from, setFrom] = useState('Wybierz język');
  const [to, setTo] = useState('Wybierz język');

  const mutation = useMutation(
    (data) => {
      return axios.post(`${settings.apiUrl}/flashCard`, data, {
        withCredentials: true,
      });
    },
    {
      onError: (error, variables, context) => {
        openNotification(error.response.data.message, 'error');
      },
      onSuccess: (data, variables, context) => {
        openNotification('Flash Card has been added', 'success');
        handleClose();
      },
    }
  );

  const handleClick = () => {
    if (!name || !desc || !from || !to)
      return openNotification('Please provide all data', 'error');

    mutation.mutate({
      name,
      description: desc,
      translatedFrom: from,
      translatedTo: to,
    });
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
          <InputLabel id="demo-simple-select-label">Translated from</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={from}
            label="Age"
            sx={{ width: '100%' }}
            onChange={(e) => {
              setFrom(e.target.value);
            }}
          >
            {['Wybierz język', ...languages].map((lang) => (
              <MenuItem value={lang} key={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <InputLabel id="demo-simple-select-label">Translated to</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={to}
            label="Age"
            sx={{ width: '100%' }}
            onChange={(e) => {
              setTo(e.target.value);
            }}
          >
            {['Wybierz język', ...languages].map((lang) => (
              <MenuItem value={lang} key={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
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

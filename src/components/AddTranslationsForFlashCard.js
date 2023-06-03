import React, { useState, useRef } from 'react';
import { Modal, Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settings } from '../config';
import useNotification from '../hooks/useNotification';

export default function AddTranslationsForFlashCard({
  flashCardId,
  open,
  handleClose,
}) {
  const [words, setWords] = useState([{ word: '', translation: '', id: 1 }]);
  const newId = useRef(2);
  const { openNotification } = useNotification();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) => {
      return axios.post(
        `${settings.apiUrl}/flashCard/${flashCardId}/translation`,
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
        queryClient.invalidateQueries(['flashCards', flashCardId], {
          exact: true,
        });
        openNotification('Translations added to Flash Card', 'success');
        handleClose();
      },
    }
  );

  const handleClick = () => {
    const dataToSend = words
      .map((word) => {
        if (word.word && word.translation)
          return { word: word.word, translation: word.translation };
        return false;
      })
      .filter((item) => item);

    console.log(dataToSend);

    if (!dataToSend.length)
      return openNotification('Please provide correct data', 'error');

    mutation.mutate({
      translations: dataToSend,
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
          <Typography variant="h5">Words to Add</Typography>
        </Box>
        {words.map((word) => {
          return (
            <Box key={word.id} sx={{ display: 'flex', gap: 1, marginTop: 1 }}>
              <TextField
                label="Word"
                value={word.word}
                onChange={(e) => {
                  const index = words.findIndex((el) => el.id === word.id);
                  setWords((prev) => {
                    const tmp = [...prev];
                    tmp[index] = { ...tmp[index], word: e.target.value };
                    return tmp;
                  });
                }}
              />
              <TextField
                label="Translation"
                value={word.translation}
                onChange={(e) => {
                  const index = words.findIndex((el) => el.id === word.id);
                  setWords((prev) => {
                    const tmp = [...prev];
                    tmp[index] = { ...tmp[index], translation: e.target.value };
                    return tmp;
                  });
                }}
              />
            </Box>
          );
        })}
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setWords((prev) => [
                ...prev,
                { word: '', translation: '', id: newId.current },
              ]);
              newId.current++;
            }}
            sx={{ fontSize: '25px', marginTop: 2, width: '100%' }}
          >
            +
          </Button>
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

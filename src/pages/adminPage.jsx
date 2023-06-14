import { Button, Container, Grid, Typography } from "@mui/material"
import useUser from "../hooks/useUser"
import { isAdmin } from "../utils/isAdmin"
import ForbiddenPage from "./forbiddenPage"
import { DataGrid } from "@mui/x-data-grid"
import Checkbox from '@mui/material/Checkbox';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { settings } from "../config"
import LoadingComponent from "../components/LoadingComponent"
import useNotification from "../hooks/useNotification"
import { useState } from "react"
import WordsEditModal from "../components/WordsEditModal"




export const AdminPage = () => {
    const {user} = useUser()
    const { openNotification } = useNotification();
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false)
    const [currentFlash, setCurrentFlash] = useState(null)

    

    const deleteTranslationMutation = useMutation(
        (data) => {
          return axios.delete(
            `${settings.apiUrl}/flashCard/${data.id}`,
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
            queryClient.invalidateQueries(['flashCardQueryKey'], {
              exact: true,
            });
          },
        }
      );
      const deleteUserMutation = useMutation(
        (data) => {
          return axios.delete(
            `${settings.apiUrl}/user/${data.id}`,
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
            openNotification('You have successfully delete User', 'success');
            queryClient.invalidateQueries(['userQueryKey'], {
              exact: true,
            });
          },
        }
      );

      const changeUserData = useMutation(
        (data) => {
          return axios.patch(
            `${settings.apiUrl}/user/${data.id}`,
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
            openNotification('You have successfully updated User', 'success');
            queryClient.invalidateQueries(['userQueryKey'], {
              exact: true,
            });
          },
        }
      );

      const changeFlashbackData = useMutation(
        (data) => {
          return axios.patch(
            `${settings.apiUrl}/user/${data.id}`,
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
            openNotification('You have successfully updated User', 'success');
            queryClient.invalidateQueries(['userQueryKey'], {
              exact: true,
            });
          },
        }
      );
      

      const FlashColumns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        {
          field: 'description',
          headerName: 'Description',
          width: 400,
          editable: true,
        },
        {
            field: 'edit',
            headerName: 'Edit Words',
            sortable: false,
            width: 160,
            renderCell: (params) => {
              const handleClick = (e) => {
                e.stopPropagation();
                setCurrentFlash(params.id)
                setModalOpen(true)
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
                  Edit
                </Button>
              );
            },
          },
        {
            field: 'delete',
            headerName: 'Delete',
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

      const UserColumns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
          editable: true,
        },
        {
            field: 'role',
            headerName: 'isAdmin',
            width: 160,
            renderCell: (params) => {

                const handleChange = (e) => {
                    const role = e.target.checked ? 'admin' : 'user'
                    
                    changeUserData.mutate({ id: params.id, role: role })
                }

                return (<Checkbox checked={params?.value === 'admin'} onChange={handleChange}/>)
            }
          },
          {
            field: 'active',
            headerName: 'Active',
            width: 160,
            renderCell: (params) => {

                const handleChange = (e) => {

                }

                return (<Checkbox checked={params?.value === 'active'} onChange={handleChange}/>)
            }
          },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            width: 160,
            renderCell: (params) => {
              const handleClick = (e) => {
                e.stopPropagation();
      
                deleteUserMutation.mutate({ id: params.id });
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


    const flashCardQueryKey = ['flashCards'];
    const userQueryKey = ['users']


    const flashCardsQuery = useQuery({
        queryKey: flashCardQueryKey,
        queryFn: () => axios.get(`${settings.apiUrl}/flashCard`).then((res) => res.data),
    });

    const UsersQuery = useQuery({
        queryKey: userQueryKey,
        queryFn: () => axios.get(`${settings.apiUrl}/user`,{
            withCredentials: true
          }).then((res) => res.data),
    });

    const updateUserData = (data, event) => {
        const newValue = event.target.value;
        if (newValue === data.value) return false;

        const dataToSend = { id: data.id };
        dataToSend[data.field] = newValue;
        changeUserData.mutate(dataToSend);
    }
    const updateFlashcardData = (data, event) => {
        const newValue = event.target.value;
        if (newValue === data.value) return false;

        const dataToSend = { id: data.id };
        dataToSend[data.field] = newValue;
        changeFlashbackData.mutate(dataToSend);
    }

    const handleClose = () => {
        setModalOpen(false)
    }

    if(!isAdmin(user)) return (<ForbiddenPage/>)

    return (
        <Container sx={{ minHeight: '100vh' }}>
            <Typography variant="h4">
                Flashcards
            </Typography>
            {flashCardsQuery.isLoading ? <LoadingComponent/> :
            <Grid item xs={12} sx={{ marginTop: 1 }}>
            <DataGrid
              rows={flashCardsQuery.data.data.flashCards}
              columns={FlashColumns}
              pageSizeOptions={[5, 10]}
              columnVisibilityModel={{
                id: false,
              }}
              getRowId={(row) => row._id}
              disableRowSelectionOnClick
              isCellEditable={() => {
                return user?.role === 'admin'
                  ? true
                  : false;
              }}
              onCellEditStop={updateFlashcardData}
            />
          </Grid>
            }
            <Typography variant="h4">
                Users
            </Typography>
            {UsersQuery.isLoading ? <LoadingComponent/> :
            <Grid item xs={12} sx={{ marginTop: 1 }}>
                {console.log(UsersQuery.data.data.users)}
            <DataGrid
              rows={UsersQuery.data.data.users}
              columns={UserColumns}
              pageSizeOptions={[5, 10]}
              columnVisibilityModel={{
                id: false,
              }}
              getRowId={(row) => row._id}
              disableRowSelectionOnClick
              isCellEditable={() => {
                return user?.role === 'admin'
                  ? true
                  : false;
              }}
              onCellEditStop={updateUserData}
            />
          </Grid>
            }
            {modalOpen ? <WordsEditModal
                open={modalOpen}
                onClose={handleClose}
                flashCardId={currentFlash}
                >

            </WordsEditModal> : ''}
            
      </Container> 
    )
}
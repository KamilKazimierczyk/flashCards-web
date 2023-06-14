import { Avatar, Button, Container, Grid, IconButton, Modal, Paper, TextField} from "@mui/material"
import useUser from "../hooks/useUser";
import {  useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { settings } from "../config";
import useNotification from "../hooks/useNotification";
import LoginPage from "./loginPage";

export const MePage = () => {
    const { user, logout, login } = useUser();
    const [inputDisabled , setInputDisabled] = useState({email: true, name: true})
    const emailInput = useRef(user.email)
    const nameInput = useRef(user.name)
    const [open, setOpen] = useState(false)
    const { openNotification } = useNotification();

    const currentPassword = useRef()
    const newPassword = useRef()
    const confirmNewPassword = useRef()

    

    const updateUserMutation = useMutation(
        (data) => {
          return axios.patch(
            `${settings.apiUrl}/user/updateme`,
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
            openNotification('Data has been updated', 'success');
            login(data.data.data.user)
          },
        }
      );

      const updatePasswordMutation = useMutation(
        (data) => {
          return axios.patch(
            `${settings.apiUrl}/user/updatepassword`,
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
            openNotification('Password has beeen updated', 'success');
            setOpen(false)
          },
        }
      );

      const handleUpdateMail = () => {
        setInputDisabled((prev)=>({...prev, email: true}))
        updateUserMutation.mutate({body: {email: emailInput.current.value}});
      }
      const handleUpdateName = () => {
        setInputDisabled((prev)=>({...prev, name: true}))
        updateUserMutation.mutate({body: {name: nameInput.current.value}});
      }

      const handleClose = () => {
        setOpen(false)
      }
    const handleChangePassword = () => {
        console.log(!!currentPassword.current.value)
        if(!currentPassword.current.value || !newPassword.current.value || !confirmNewPassword.current.value) {
            return openNotification('All fields have to be filled', 'error')
        } 
        const dataToSend = {body: {
            passwordCurrent: currentPassword.current.value,
            password: newPassword.current.value,
            passwordConfirm: confirmNewPassword.current.value
        }}
        updatePasswordMutation.mutate(dataToSend)

    }

      if(!user.loggedIn) return(<LoginPage/>)

    return(
        <Container sx={{pt: 2}}>
            <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 400, mx: 'auto'}}>
                <Grid container spacing={2} justifyContent='center' alignItems='center' sx={{p: 1}} >
                    <Grid item xs={2}>
                        <Avatar
                        alt={user.name.charAt(0)}
                        src="/static/images/avatar/2.jpg"
                        />
                    </Grid>
                    <Grid item xs={10}>
                        Hello {user.name}
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            disabled={inputDisabled.email}
                            id="outlined-disabled"
                            label="Email"
                            defaultValue={user.email}
                            sx={{width: '100%'}}
                            inputRef={emailInput}
                        />
                    </Grid>
                    <Grid item xs={inputDisabled.email ? 4 : 2}>
                        <IconButton color="primary" aria-label="Edit mail" onClick={() => {setInputDisabled((prev)=>({...prev, email: !prev.email}))}}>
                            {inputDisabled.email ? <EditIcon /> : <ClearIcon color="error"/>}
                        </IconButton>
                    </Grid>
                    {!inputDisabled.email ?
                    <Grid item xs={2}>
                        <IconButton color="primary" aria-label="Edit mail" onClick={handleUpdateMail}>
                            <CheckIcon />
                        </IconButton>
                    </Grid> : ''}
                    
                    <Grid item xs={8}>
                        <TextField
                            disabled={inputDisabled.name}
                            id="outlined-disabled"
                            label="Name"
                            defaultValue={user.name}
                            sx={{width: '100%'}}
                            inputRef={nameInput}
                        />
                    </Grid>
                    <Grid item xs={inputDisabled.name ? 4 : 2}>
                        <IconButton color="primary" aria-label="Edit mail" onClick={() => {setInputDisabled((prev)=>({...prev, name: !prev.name}))}}>
                            {inputDisabled.name ? <EditIcon /> : <ClearIcon color="error"/>}
                        </IconButton>
                    </Grid>
                    {!inputDisabled.name ?
                    <Grid item xs={2}>
                        <IconButton color="primary" aria-label="Edit mail" onClick={handleUpdateName}>
                            <CheckIcon />
                        </IconButton>
                    </Grid> : ''}
                    <Grid item container xs={12}>
                        <Grid item xs={6}>
                            <Button color="primary" variant="contained" onClick={() => {setOpen(true)}}>Change password</Button>
                        </Grid>
                        <Grid item container xs={6}>
                            <Button color="primary" sx={{marginLeft: "auto"}} variant="contained" onClick={logout}>Logout</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Modal 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="modal-modal-title" 
                aria-describedby="modal-modal-description" 
                sx={{display:'flex',alignItems: 'center', justifyContent: 'center'}}>
                    <Paper elevation={3} sx={{p: 3, maxWidth: 400}}>
                        <Grid spacing={2} container sx={{justifyContent: 'center'}}>
                            <Grid item xs={12}>
                                <TextField
                                id="outlined-disabled"
                                label="Current password"
                                sx={{width: '100%'}}
                                inputRef={currentPassword}
                                type="password"
                            />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                id="outlined-disabled"
                                label="New password"
                                sx={{width: '100%'}}
                                inputRef={newPassword}
                                type="password"
                            />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                id="outlined-disabled"
                                label="Confirm new password"
                                sx={{width: '100%'}}
                                inputRef={confirmNewPassword}
                                type="password"
                            />
                            </Grid>
                            <Grid item container xs={6}>
                                <Button sx={{marginLeft: 'auto'}} variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="primary" onClick={handleChangePassword}>Proceed</Button>
                            </Grid>
                        </Grid>
                    </Paper>
            </Modal>
        </Container>
    )
}
'use client';
import React, {useState} from "react";
import {RecoverPasswordRequest} from "@/types/user/userTypes";
import {
    Alert,
    AlertColor,
    Avatar,
    Box,
    Button,
    Container, FormControl, FormHelperText,
    InputLabel, OutlinedInput,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {recoverPassword} from "@/services/authService";
import {setAuthentication} from "@/redux/auth-slice";
import {useDispatch} from "react-redux";
import RecoveryToken from "@/components/RecoveryToken";

export default function RecoverPassword() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [recoveryToken, setRecoveryToken] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const recoverPasswordRequest: RecoverPasswordRequest = {
            token: data.get('recoveryToken')?.toString() as string,
            newPassword: data.get('newPassword')?.toString() as string,
            confirmationPassword: data.get('confirmationPassword')?.toString() as string,
            email: data.get('email')?.toString() as string,
        }

        recoverPassword(recoverPasswordRequest).then((response) => {
            if (response?.token) {
                dispatch(setAuthentication(response.token));
                setRecoveryToken(response.recoveryToken);
                handleOpenModal();
            } else {
                setAlertMessage('Failed to recover password. Please try again.');
                setAlertSeverity('error');
                setDisplayAlert(true);
            }
        })
            .catch((error) => {
                console.error('Error recovering password:', error);
                setAlertMessage('An error occurred while recovering the password. Please try again later.');
                setAlertSeverity('error');
                setDisplayAlert(true);
            });
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const [displayAlert, setDisplayAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const handleCloseAlert = () => {
        setDisplayAlert(false);
    };

    return (
        <Container component="main">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Recover your password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        name="recoveryToken"
                        label="Recovery Token"
                        type="text"
                        id="recoveryToken"
                        error={displayAlert}
                    />
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        id="newPassword"
                        autoComplete="new-password"
                        error={displayAlert}
                    />
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        name="confirmationPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmationPassword"
                        autoComplete="new-password"
                        error={displayAlert}
                    />
                    <FormControl required fullWidth error={displayAlert} sx={{mt: 1}}>
                        <InputLabel htmlFor="password">Email</InputLabel>
                        <OutlinedInput
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            aria-describedby="component-helper-text"
                            margin="dense"
                        />
                        <FormHelperText id="component-helper-text" style={{ textAlign: 'justify' }}>
                            {displayAlert ? 'Check if provided data is correct.' : ''}
                        </FormHelperText>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Set new password
                    </Button>
                    <RecoveryToken open={isModalOpen} onClose={handleCloseModal} recoveryToken={recoveryToken}/>
                    <Snackbar open={displayAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity={alertSeverity as AlertColor}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </Container>
    );
};
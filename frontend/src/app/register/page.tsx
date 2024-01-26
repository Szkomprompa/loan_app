'use client';
import React, {useState} from 'react';
import {
    Link,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Snackbar,
    Alert,
    AlertColor, FormControl, InputLabel, FormHelperText, OutlinedInput
} from '@mui/material';
import {LockOutlined} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {register} from "@/services/authService";
import {setAuthentication} from "@/redux/auth-slice";
import RecoveryToken from "@/components/RecoveryToken";

export default function Register() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [recoveryToken, setRecoveryToken] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const registerRequest = {
            email: data.get('email')?.toString() as string,
            password: data.get('password')?.toString() as string,
            firstName: data.get('firstName')?.toString() as string,
            lastName: data.get('lastName')?.toString() as string,
        }

        register(registerRequest).then((response) => {
            if (response?.token) {
                dispatch(setAuthentication(response.token));
                setRecoveryToken(response.recoveryToken);
                setAlertMessage('Successfully registered user.');
                setAlertSeverity('success');
                setDisplayAlert(true);
                handleOpenModal();
            } else {
                setAlertMessage('Failed to register user. Please try again.');
                setAlertSeverity('error');
                setDisplayAlert(true);
            }
        })
            .catch((error) => {
                console.error('Error registering user:', error);
                setAlertMessage('An error occurred while registering the user. Please try again later.');
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
        <Container component="main" maxWidth="xs">
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
                    Register
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl required error={displayAlert} sx={{mt: 1}}>
                                <InputLabel htmlFor="firstName">First Name</InputLabel>
                                <OutlinedInput
                                    autoComplete="given-name"
                                    name="firstName"
                                    fullWidth
                                    id="firstName"
                                    autoFocus
                                    aria-describedby="component-helper-text"
                                    label="First Name"
                                    margin="dense"
                                />
                                <FormHelperText id="component-helper-text" style={{ textAlign: 'justify' }}>
                                    {displayAlert ? 'Must start with a capital letter and contain only letters.' : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required error={displayAlert} sx={{mt: 1}}>
                                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                <OutlinedInput
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    aria-describedby="component-helper-text"
                                    margin="dense"
                                />
                                <FormHelperText id="component-helper-text" style={{ textAlign: 'justify' }}>
                                    {displayAlert ? 'Must start with a capital letter and contain only letters.' : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required fullWidth error={displayAlert} sx={{mt: 1}}>
                                <InputLabel htmlFor="emial">Email</InputLabel>
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
                                    {displayAlert ? 'Must be a valid email address.' : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required fullWidth error={displayAlert} sx={{mt: 1}}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    aria-describedby="component-helper-text"
                                    margin="dense"
                                />
                                <FormHelperText id="component-helper-text" style={{ textAlign: 'justify' }}>
                                    {displayAlert ? 'Must contain at least 7 characters, including at least 1 uppercase letter, 1 lowercase letter, one digit, and one special character.' : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3, mb: 2}}
                    >
                        Register
                    </Button>
                    <RecoveryToken open={isModalOpen} onClose={handleCloseModal} recoveryToken={recoveryToken}/>
                    <Snackbar open={displayAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity={alertSeverity as AlertColor}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" color="secondary" variant="body2">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

'use client';
import React, {useState} from 'react';
import {
    Link,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Snackbar,
    Alert,
    AlertColor
} from '@mui/material';
import {LockOutlined} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {register} from "@/services/authService";
import {setAuthentication} from "@/redux/auth-slice";
import RecoveryToken from "@/components/RecoveryToken";
import LoanForm from "@/components/LoanForm";

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
                handleOpenModal();
            } else {
                // Show a Material-UI Alert to the user indicating an issue with the response
                setAlertMessage('Failed to recover password. Please try again.');
                setAlertSeverity('error');
                setDisplayAlert(true);
            }
        })
            .catch((error) => {
                // Handle the error and show a Material-UI Alert to the user
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
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
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

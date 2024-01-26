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
    Typography, Alert, AlertColor, Snackbar, InputLabel, OutlinedInput, FormHelperText, FormControl
} from '@mui/material';
import {LockOutlined} from "@mui/icons-material";
import {LoginRequest} from "@/types/user/userTypes";
import {login} from "@/services/authService";
import {useDispatch} from "react-redux";
import {setAuthentication} from "@/redux/auth-slice";
import {useRouter} from "next/navigation";

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const loginRequest: LoginRequest = {
            email: data.get('email')?.toString() as string,
            password: data.get('password')?.toString() as string,
        }

        login(loginRequest).then((response) => {
            if (response?.token) {
                dispatch(setAuthentication(response?.token));
                router.push('/loans/lent-loans');
            } else {
                setAlertMessage('Failed to log in. Please try again.');
                setAlertSeverity('error');
                setDisplayAlert(true);
            }
        })
            .catch((error) => {
                console.log("Error logging in:", error);
                setAlertMessage('An error occurred while logging in. Please try again later.');
                setAlertSeverity('error');
                setDisplayAlert(true);
            });
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
                    Log in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={displayAlert}
                    />
                    <FormControl required fullWidth error={displayAlert} sx={{mt: 1}}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            aria-describedby="component-helper-text"
                            margin="dense"
                        />
                        <FormHelperText id="component-helper-text" style={{ textAlign: 'justify' }}>
                            {displayAlert ? 'Incorrect email or password.' : ''}
                        </FormHelperText>
                    </FormControl>
                    <Link href="/">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Log In
                        </Button>
                        <Snackbar open={displayAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                            <Alert onClose={handleCloseAlert} severity={alertSeverity as AlertColor}>
                                {alertMessage}
                            </Alert>
                        </Snackbar>
                    </Link>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/recover-password" color="secondary" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" color="secondary" variant="body2">
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

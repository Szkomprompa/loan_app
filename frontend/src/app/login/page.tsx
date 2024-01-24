'use client';
import React from 'react';
import {
    Link,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography, Alert
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
            dispatch(setAuthentication(response?.token));
            router.push('/loans/lent-loans');
        }).catch((error) => {
            console.log("Problem logging in", error);
        });
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
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Link href="/">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Log In
                        </Button>
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

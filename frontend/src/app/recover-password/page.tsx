'use client';
import {useRouter} from "next/navigation";
import React from "react";
import {RecoverPasswordRequest} from "@/types/user/userTypes";
import {Avatar, Box, Button, Container, Link, TextField, Typography} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import Header from "@/components/Header";
import {recoverPassword} from "@/services/authService";
import {setAuthentication} from "@/redux/auth-slice";
import {useDispatch} from "react-redux";

export default function RecoverPassword() {
    const router = useRouter();
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

        recoverPassword(recoverPasswordRequest).then((response)=> {
            dispatch(setAuthentication(response?.token));
            router.push('/recovery-token');
        })
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
                        margin="normal"
                        required
                        fullWidth
                        name="recoveryToken"
                        label="Recovery Token"
                        type="text"
                        id="recoveryToken"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        id="newPassword"
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmationPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmationPassword"
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        autoComplete="email"
                    />
                    <Link href="/">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Set new password
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};
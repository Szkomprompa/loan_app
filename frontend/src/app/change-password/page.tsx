'use client';
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import React from "react";
import {ChangePasswordRequest} from "@/types/user/userTypes";
import {Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {changePassword} from "@/services/userService";
import {RootState} from "@/redux/global-store";
import Header from "@/components/Header";

export default function ChangePassword() {
    const router = useRouter();

    const token = useSelector((state: RootState) => state.auth.token);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const changePasswordRequest: ChangePasswordRequest = {
            currentPassword: data.get('currentPassword')?.toString() as string,
            newPassword: data.get('newPassword')?.toString() as string,
            confirmationPassword: data.get('confirmationPassword')?.toString() as string,
        }

        changePassword(changePasswordRequest, token).then(()=> {
            router.push('/loans/lent-loans');
        })
    };

    return (
        <Container component="main">
            <Header/>
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
                    Change password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        id="currentPassword"
                        autoComplete="current-password"
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
                </Box>
            </Box>
        </Container>
    );
};
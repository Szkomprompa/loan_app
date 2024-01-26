'use client';
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {ChangePasswordRequest} from "@/types/user/userTypes";
import {
    Alert,
    AlertColor,
    Avatar,
    Box,
    Button,
    Container, FormControl, FormHelperText,
    Grid, InputLabel,
    Link, OutlinedInput,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {changePassword} from "@/services/userService";
import {RootState} from "@/redux/global-store";
import Header from "@/components/Header";
import NotLoggedIn from "@/components/NotLoggedIn";

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

        changePassword(changePasswordRequest, token).then(() => {
            setAlertMessage('Password changed successfully.');
            setAlertSeverity('success');
            setDisplayAlert(true);
            router.push('/loans/lent-loans');
        }).catch((error) => {
            console.error('Error changing password:', error);
            setAlertMessage('An error occurred while changing the password. Please try again later.');
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

    if (token === null) {
        return (
            <NotLoggedIn />
        );
    }

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
                        margin="dense"
                        required
                        fullWidth
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        id="currentPassword"
                        autoComplete="current-password"
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
                    <Grid item xs={12}>
                        <FormControl required fullWidth error={displayAlert} sx={{mt: 1}}>
                            <InputLabel htmlFor="password">Confirmation Password</InputLabel>
                            <OutlinedInput
                                margin="dense"
                                required
                                fullWidth
                                name="confirmationPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmationPassword"
                                autoComplete="new-password"
                                aria-describedby="component-helper-text"
                            />
                            <FormHelperText id="component-helper-text" style={{ textAlign: 'justify' }}>
                                {displayAlert ? 'Incorrect data.' : ''}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Change Password
                    </Button>
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
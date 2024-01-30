'use client';
import React from 'react';
import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import Link from 'next/link';
import {TextSnippet} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {setAuthentication} from "@/redux/auth-slice";

function Header() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setAuthentication(''));
        console.log('User logged out');
    };

    return (
        <AppBar position="absolute">
            <Toolbar>
                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                    <TextSnippet color="secondary"/>
                    <Typography variant="h6" color="secondary">
                        LoanManager
                    </Typography>

                    <Link href="/loans/lent-loans" passHref>
                        <Button color="secondary">Lent loans</Button>
                    </Link>

                    <Link href="/loans/borrowed-loans" passHref>
                        <Button color="secondary">Borrowed loans</Button>
                    </Link>

                    <Link href="/debts" passHref>
                        <Button color="secondary">Debts</Button>
                    </Link>

                    <Link href="/change-password" passHref>
                        <Button color="secondary">Change password</Button>
                    </Link>
                </Box>

                <Link href="/login" passHref>
                    <Button color="secondary" onClick={handleLogout}>
                        <Typography color="secondary">
                            Logout
                        </Typography>
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

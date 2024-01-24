'use client';
import Link from "next/link";
import {Typography} from "@mui/material";
import React, {useEffect} from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/global-store";
import {getRecoveryToken} from "@/services/userService";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function Page() {
    const [recoveryToken, setRecoveryToken] = React.useState<string | null>(null);

    console.log('RecoveryToken', recoveryToken);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        getRecoveryToken(token).then((response) => {
            setRecoveryToken(response);
        }).catch((error) => {
            console.log("Problem getting recovery token", error);
        });
    }, [token]);

    if (!token) {
        return <NotLoggedIn/>;
    }

    return (
        <Container
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh'
            }}
        >
            <Box>
                <Typography variant="h4" align="center" pb={3}>
                    This is your recovery token (save it for later):
                </Typography>
                <Typography variant="body2" align="center" pb={3}>
                    {recoveryToken}
                </Typography>
                <Link href="/loans/lent-loans">
                    <Button variant="contained" color="primary" fullWidth>
                        OK
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};
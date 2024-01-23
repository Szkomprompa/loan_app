import Link from "next/link";
import {Typography} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function NotLoggedIn() {
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
                    Not logged in
                </Typography>
                <Link href="/login">
                    <Button variant="contained" color="primary" fullWidth>
                        Log In
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};
import {Dialog, DialogContent, Typography} from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";
import React from "react";

export default function RecoveryToken(props: {open: boolean, onClose: () => void, recoveryToken: string} ) {
    const handleCloseModal = () => {
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
            <DialogContent>
                <Typography variant="h4" align="center" pb={3}>
                    This is your recovery token. Please save it in case of losing your password.
                </Typography>
                <Typography variant="body1" align="center" pb={3}>
                    {props.recoveryToken}
                </Typography>
                <Link href="/loans/lent-loans">
                    <Button variant="contained" color="primary" fullWidth onClick={handleCloseModal}>
                        OK
                    </Button>
                </Link>
            </DialogContent>
        </Dialog>
    );
};
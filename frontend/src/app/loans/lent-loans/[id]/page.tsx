'use client';

import React, {useEffect, useState} from "react";
import {
    Alert, AlertColor,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select, Snackbar,
    Typography
} from "@mui/material";
import {LoanDto} from "@/types/loan/loanTypes";
import {getLoanById, repayLoan} from "@/services/loanService";
import {RootState} from "@/redux/global-store";
import {useSelector} from "react-redux";
import Header from "@/components/Header";
import Link from "next/link";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function LentLoan({params}: { params: { id: number } }) {
    const [loan, setLoan] = useState<LoanDto | null>(null);
    const [newLoanStatus, setNewLoanStatus] = useState<string | ''>('');

    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        getLoanById(params.id, token)
            .then((loan) => {
                setLoan(loan);
                setNewLoanStatus(loan?.status || '');
            });
    }, [params.id, token]);

    const handleStatusChange = async () => {
        try {
            if (newLoanStatus && loan) {
                if (newLoanStatus === "PAID") {
                    await repayLoan(params.id, token);
                    setAlertMessage('Loan status updated successfully');
                    setAlertSeverity('success');
                    setDisplayAlert(true);
                } else {
                    setAlertMessage('Invalid status');
                    setAlertSeverity('error');
                    setDisplayAlert(true);
                }

                const updatedLoan = await getLoanById(params.id, token);
                setLoan(updatedLoan);
            }
        } catch (error) {
            setAlertMessage('Failed to update loan status');
            setAlertSeverity('error');
            setDisplayAlert(true);
        }
    };

    const [displayAlert, setDisplayAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const handleCloseAlert = () => {
        setDisplayAlert(false);
    };

    if (token === null) {
        return (
            <NotLoggedIn/>
        );
    }

    return (
        <Container component="main" maxWidth="sm">
            <Header/>

            <Typography variant="h4" color="primary" gutterBottom mt={3}>
                Note Details
            </Typography>
            <Paper sx={{p: 4, mt: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h5" gutterBottom>
                            Id
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {loan?.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" paragraph>
                            Borrower Email
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {loan?.borrowerEmail}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" paragraph>
                            Lender Email
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {loan?.lenderEmail}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" gutterBottom>
                            Creation Date
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {loan?.creationDate}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" gutterBottom>
                            Due Date
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {loan?.dueDate}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" gutterBottom>
                            Amount
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {loan?.amount} $
                        </Typography>
                    </Grid>
                    <Grid item xs={6} container alignItems="center">
                        <Typography variant="h5" gutterBottom>
                            Current status
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                            {loan?.status}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{pb: 1}}>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="loan-status">Change Status</InputLabel>
                            <Select
                                margin="dense"
                                id="loan-status"
                                value={newLoanStatus}
                                label="Change Status"
                                onChange={(e) => setNewLoanStatus(e.target.value as string)}
                            >
                                <MenuItem value={"PAID"}>Paid</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleStatusChange} sx={{mr: 5}}>
                            Update Status
                        </Button>
                        <Link href={'/loans/lent-loans'}>
                            <Button variant="contained" color="primary">
                                Go back
                            </Button>
                        </Link>
                        <Snackbar open={displayAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                            <Alert onClose={handleCloseAlert} severity={alertSeverity as AlertColor}>
                                {alertMessage}
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
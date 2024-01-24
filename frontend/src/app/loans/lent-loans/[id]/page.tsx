'use client';

import {useEffect, useState} from "react";
import {Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography} from "@mui/material";
import {LoanDto} from "@/types/loan/loanTypes";
import {getLoanById, repayLoan} from "@/services/loanService";
import {RootState} from "@/redux/global-store";
import {useSelector} from "react-redux";
import Header from "@/components/Header";

export default function LentLoan({params}: { params: { id: number } }) {
    const [loan, setLoan] = useState<LoanDto | null>(null);
    const [newLoanStatus, setNewLoanStatus] = useState<string | ''>('');

    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        getLoanById(params.id, token)
            .then((loan) => {
                setLoan(loan);
            });
    }, [params.id, token]);

    const handleStatusChange = async () => {
        try {
            if (newLoanStatus && loan) {
                if (newLoanStatus === "PAID") {
                    await repayLoan(params.id, token);
                }

                const updatedLoan = await getLoanById(params.id, token);
                setLoan(updatedLoan);
            }
        } catch (error) {
            console.error('Error updating loan status:', error);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Header/>

            <Typography variant="h4" color="primary" gutterBottom mt={3}>
                Note Details
            </Typography>
            <Paper sx={{p: 4, mt: 4}}>
                <Typography variant="h5" gutterBottom>
                    Id
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {loan?.id}
                </Typography>
                <Typography variant="h5" paragraph>
                    Borrower Email
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {loan?.borrowerEmail}
                </Typography>
                <Typography variant="h5" paragraph>
                    Lender Email
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {loan?.lenderEmail}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Creation Date
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {loan?.creationDate}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Due Date
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {loan?.dueDate}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Amount
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {loan?.amount}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {loan?.status}
                    <FormControl fullWidth sx={{py: 3}}>
                        <InputLabel htmlFor="loan-status" >Change Status</InputLabel>
                        <Select
                            id="loan-status"
                            value={newLoanStatus}
                            label="Change Status"
                            onChange={(e) => setNewLoanStatus(e.target.value as string)}
                        >
                            <MenuItem value={"PAID"}>Paid</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleStatusChange}>
                        Update Status
                    </Button>
                </Typography>
            </Paper>
        </Container>
    )
}
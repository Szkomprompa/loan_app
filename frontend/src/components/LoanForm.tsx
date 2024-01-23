import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import React, {useState} from "react";
import {createLoan} from "@/services/loanService";
import {LoanRequest} from "@/types/loan/loanTypes";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/global-store";


const LoanForm = (props: {open: boolean, onClose: () => void} ) => {
    const [borrowerEmail, setBorrowerEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');

    const token = useSelector((state: RootState) => state.auth.token);

    const handleAddNote = () => {
        console.log('Adding loan:', {borrowerEmail, amount, dueDate});

        const loanRequest: LoanRequest = {
            borrowerEmail: borrowerEmail,
            amount: +amount,
            dueDate: dueDate,
        }

        createLoan(loanRequest, token)
            .then((createdLoan) => console.log('Created loan:', createdLoan))
            .catch((error) => console.error('Error creating loan:', error));

        setAmount('');
        setBorrowerEmail('');
        setDueDate('');

        props.onClose();
    };



    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
            <DialogTitle>Add New Loan</DialogTitle>
            <DialogContent>
                <TextField
                    label="Borrower Email"
                    variant="outlined"
                    fullWidth
                    value={borrowerEmail}
                    onChange={(e) => setBorrowerEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Amount"
                    variant="outlined"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Due Date"
                    variant="outlined"
                    fullWidth
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleAddNote}>
                    Add Loan
                </Button>
                <Button variant="contained" color="primary" onClick={props.onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoanForm;
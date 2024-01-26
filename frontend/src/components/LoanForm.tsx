import {
    Alert, AlertColor,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, InputAdornment, Snackbar,
    TextField,
} from "@mui/material";
import React, {useState} from "react";
import {createLoan} from "@/services/loanService";
import {LoanRequest} from "@/types/loan/loanTypes";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/global-store";
import {DatePicker, DateValidationError, LocalizationProvider, PickerChangeHandlerContext} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs, {Dayjs} from "dayjs";

const LoanForm = (props: { open: boolean, onClose: () => void }) => {
    const [borrowerEmail, setBorrowerEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState(dayjs().add(7, 'day'));

    const token = useSelector((state: RootState) => state.auth.token);

    const handleAddNote = () => {
        console.log('Adding loan:', {borrowerEmail, amount, dueDate});

        const isValidAmount = /^[0-9]+(\.[0-9]{2})$/.test(amount);

        if (!isValidAmount) {
            console.error('Invalid amount format');
            setAlertMessage('Invalid amount format');
            setAlertSeverity('error');
            setDisplayAlert(true);
            return;
        }

        const formattedDueDate = dayjs(dueDate).format('YYYY-MM-DD');

        const loanRequest: LoanRequest = {
            borrowerEmail: borrowerEmail,
            amount: +amount,
            dueDate: formattedDueDate,
        }

        createLoan(loanRequest, token)
            .then((createdLoan) => {
                console.log('Created loan:', createdLoan);
                setAmount('');
                setBorrowerEmail('');
                setDueDate(dayjs().add(7, 'day'));
                props.onClose();
            })
            .catch((error) => {
                console.error('Error creating loan:', error)
                setAlertMessage('Error creating loan');
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

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
            <DialogTitle>Add New Loan</DialogTitle>
            <DialogContent>
                <TextField
                    label="Borrower Email"
                    variant="outlined"
                    fullWidth
                    required
                    value={borrowerEmail}
                    onChange={(e) => setBorrowerEmail(e.target.value)}
                    margin="normal"
                    error={displayAlert}
                />
                <TextField
                    label="Amount"
                    variant="outlined"
                    type="number"
                    fullWidth
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    margin="normal"
                    error={displayAlert}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateField']}>
                        <DatePicker
                            sx={{color: displayAlert ? 'red' : 'inherit'}}
                            value={dueDate}
                            label="Due date"
                            format={'YYYY-MM-DD'}
                            disablePast
                            onChange={(value: Dayjs | null, _context: PickerChangeHandlerContext<DateValidationError>) => {
                                if (value !== null) {
                                    setDueDate(value);
                                }
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleAddNote}>
                    Add Loan
                </Button>
                <Button variant="contained" color="primary" onClick={props.onClose}>
                    Cancel
                </Button>
                <Snackbar open={displayAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alertSeverity as AlertColor}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </DialogActions>
        </Dialog>
    );
};

export default LoanForm;
'use client';
import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container, Table, TableBody, TableCell,
    TableContainer, TableRow,
    Typography
} from '@mui/material';
import Header from "@/components/Header";
import OrderTableHeadLent from "@/components/OrderTableHeadLent";
import {LoanDto} from "@/types/loan/loanTypes";
import {getLentLoans} from "@/services/loanService";
import {RootState} from "@/redux/global-store";
import {useSelector} from "react-redux";
import LoanForm from "@/components/LoanForm";
import Link from "next/link";
import OrderStatus from "@/components/OrderStatus";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function LentLoans() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [loans, setLoans] = React.useState<LoanDto[] | null>(null);

    const token = useSelector((state: RootState) => state.auth.token);

    const handleOpenNoteModal = () => {
        setModalOpen(true);
    };

    const handleCloseNoteModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        let timeout = setTimeout(() => {
            getLentLoans(token)
                .then((loans) => {
                    setLoans(loans);
                }).catch((error) => {
                console.error('Error fetching loans:', error);
            });
        }, 500);
        return () => clearTimeout(timeout);
    }, [isModalOpen, token]);

    if (token === null) {
        return (
            <NotLoggedIn/>
        );
    }

    return (
        <Container>
            <Header/>

            <Box sx={{
                bgcolor: 'background.paper',
                pt: 14,
                pb: 6,
                textAlign: 'center',
            }}>
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Lent loans
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Here you can find loans you have lent to other users.
                    </Typography>
                    <Box sx={{pt: 4}}>
                        <Button variant="contained" onClick={handleOpenNoteModal}>Add Loan</Button>
                        <LoanForm open={isModalOpen} onClose={handleCloseNoteModal}/>
                    </Box>
                </Container>
            </Box>

            <Container sx={{py: 8}} maxWidth="md">
                <TableContainer
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                        position: 'relative',
                        display: 'block',
                        maxWidth: '100%',
                        '& td, & th': {whiteSpace: 'nowrap'}
                    }}
                >
                    <Table
                        aria-labelledby="tableTitle"
                        sx={{
                            '& .MuiTableCell-root:first-of-type': {
                                pl: 2
                            },
                            '& .MuiTableCell-root:last-of-type': {
                                pr: 3
                            }
                        }}
                    >
                        <OrderTableHeadLent/>
                        <TableBody>
                            {loans?.map((loan) => {

                                return (
                                    <TableRow
                                        hover
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        tabIndex={-1}
                                        key={loan.id}
                                    >
                                        <TableCell align="left" role="button">
                                            <Link href={`/loans/lent-loans/${loan.id}`} passHref style={{textDecoration: 'none'}}>
                                                {loan.borrowerEmail}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left" role="button">
                                            <Link href={`/loans/lent-loans/${loan.id}`} passHref style={{textDecoration: 'none'}}>
                                                {loan.creationDate}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left" role="button">
                                            <Link href={`/loans/lent-loans/${loan.id}`} passHref style={{textDecoration: 'none'}}>
                                                {loan.dueDate}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left" role="button">
                                            <Link href={`/loans/lent-loans/${loan.id}`} passHref style={{textDecoration: 'none'}}>
                                                <OrderStatus status={loan.status}/>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="right" role="button">
                                            <Link href={`/loans/lent-loans/${loan.id}`} passHref style={{textDecoration: 'none'}}>
                                                {loan.amount}
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Container>
    )
        ;
};

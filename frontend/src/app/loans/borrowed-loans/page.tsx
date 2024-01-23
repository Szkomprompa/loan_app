'use client';
import React, {useEffect} from "react";
import {LoanDto} from "@/types/loan/loanTypes";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/global-store";
import {getBorrowedLoans} from "@/services/loanService";
import {Box, Container, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import Header from "@/components/Header";
import OrderStatus from "@/components/OrderStatus";
import OrderTableHeadBorrowed from "@/components/OrderTableHeadBorrowed";
import Link from "next/link";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function BorrowedLoans() {
    const [loans, setLoans] = React.useState<LoanDto[] | null>(null);

    const token = useSelector((state: RootState) => state.auth.token);


    useEffect(() => {
        let timeout = setTimeout(() => {
            getBorrowedLoans(token)
                .then((loans) => {
                    setLoans(loans);
                }).catch((error) => {
                console.error('Error fetching loans:', error);
            });
        }, 500);
        return () => clearTimeout(timeout);
    }, [token]);

    if (token === null) {
        return (<NotLoggedIn/>);
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
                        Borrowed loans
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Here you can find loans that have been lent to you by other users.
                    </Typography>
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
                        <OrderTableHeadBorrowed/>
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
                                                <Link href={`/loans/borrowed-loans/${loan.id}`} passHref style={{textDecoration: 'none'}}>
                                                    {loan.lenderEmail}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left" role="button">
                                                <Link href={`/loans/borrowed-loans/${loan.id}`} passHref style={{textDecoration: 'none'}}>
                                                    {loan.creationDate}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left" role="button">
                                                <Link href={`/loans/borrowed-loans/${loan.id}`} passHref style={{textDecoration: 'none'}}>
                                                    {loan.dueDate}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left" role="button">
                                                <Link href={`/loans/borrowed-loans/${loan.id}`} passHref style={{textDecoration: 'none'}}>
                                                    <OrderStatus status={loan.status}/>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right" role="button">
                                                <Link href={`/loans/borrowed-loans/${loan.id}`} passHref style={{textDecoration: 'none'}}>
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
    );
};

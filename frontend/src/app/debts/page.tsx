'use client';

import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/global-store";
import {
    Box,
    Container, Table, TableBody, TableCell,
    TableContainer, TableRow,
    Typography
} from "@mui/material";
import {useRouter} from "next/navigation";
import Header from "@/components/Header";
import {DebtDto} from "@/types/debt/debtDto";
import {getDebts} from "@/services/debtService";
import DebtsTableHead from "@/components/DebtsTableHead";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function Debts() {
    const [debts, setDebts] = React.useState<DebtDto[] | null>(null);

    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        let timeout = setTimeout(() => {
            getDebts(token)
                .then((debts) => {
                    setDebts(debts);
                }).catch((error) => {
                console.error('Error fetching debts:', error);
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
                        Debts
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Here you can find all debts.
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
                        <DebtsTableHead/>
                        <TableBody>
                            {debts?.map((debt) => {
                                return (
                                    <TableRow
                                        hover
                                        role="button"
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        tabIndex={-1}
                                        key={debt.id}
                                    >
                                        <TableCell align="left">{debt.userEmail}</TableCell>
                                        <TableCell align="left">{debt.totalAmount}</TableCell>
                                        <TableCell align="right">{debt.unpaidAmount}</TableCell>
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
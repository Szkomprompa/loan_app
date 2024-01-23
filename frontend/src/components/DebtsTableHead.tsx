import {TableCell, TableHead, TableRow} from "@mui/material";

function OrderTableHeadBorrowed() {
    const headCells = [
        {
            id: 'user',
            align: 'left' as const,
            disablePadding: true,
            label: 'User'
        },
        {
            id: 'totalAmount',
            align: 'left' as const,
            disablePadding: false,
            label: 'Total Amount'
        },
        {
            id: 'unpaidAmount',
            align: 'right' as const,
            disablePadding: false,
            label: 'Unpaid Amount'
        }
    ];

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default OrderTableHeadBorrowed;
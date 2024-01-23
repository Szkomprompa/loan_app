import {TableCell, TableHead, TableRow} from "@mui/material";

function OrderTableHeadLent() {
    const headCells = [
        {
            id: 'borrower',
            align: 'left' as const,
            disablePadding: true,
            label: 'Borrower'
        },
        {
            id: 'creationDate',
            align: 'left' as const,
            disablePadding: false,
            label: 'Creation Date'
        },
        {
            id: 'dueDate',
            align: 'left' as const,
            disablePadding: false,
            label: 'Due Date'
        },
        {
            id: 'status',
            align: 'left' as const,
            disablePadding: false,
            label: 'Status'
        },
        {
            id: 'amount',
            align: 'right' as const,
            disablePadding: false,
            label: 'Total Amount'
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
}

export default OrderTableHeadLent;
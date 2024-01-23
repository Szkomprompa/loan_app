import {Stack, Typography} from "@mui/material";
import Dot from "@/components/Dot";
import React from "react";

interface OrderStatusProps {
    status: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({status}) => {
    let color: string;
    let title: string;

    switch (status) {
        case "PENDING":
            color = 'orange';
            title = 'Pending';
            break;
        case "ACCEPTED":
            color = 'green';
            title = 'Accepted';
            break;
        case "EXPIRED":
            color = 'red';
            title = 'EXPIRED';
            break;
        case "REJECTED":
            color = 'black';
            title = 'Rejected';
            break;
        case "PAID":
            color = 'blue';
            title = 'Paid';
            break;
        default:
            color = 'white';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

export default OrderStatus;
import { Box } from '@mui/material';
import React from "react";

interface DotProps {
    color: string;
}

const Dot: React.FC<DotProps> = ({color}) => {
    let main;
    switch (color) {
        case 'blue':
            main = '#2196f3';
            break;
        case 'red':
            main = '#f44336';
            break;
        case 'orange':
            main = '#ff9800';
            break;
        case 'black':
            main = '#000000';
            break;
        case 'green':
            main = '#4caf50';
            break;
        case 'white':
            main = '#ffffff';
            break;
        default:
            main = '#ffffff';
    }

    return (
        <Box
            sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: main
            }}
        />
    );
};

export default Dot;
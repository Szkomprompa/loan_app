"use client";
import {createTheme} from '@mui/material/styles';
import { orange } from "@mui/material/colors";


const theme = createTheme({
    palette: {
        primary: {
            main: orange[500],
            contrastText: "#594726",
        },
        secondary: {
            main: '#594726',
        },
    },
    typography: {
        "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500,
    },
});

export default theme;
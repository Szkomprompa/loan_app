import {ThemeProvider} from "@mui/material";
import theme from "@/app/theme";
import React from "react";
import {ReduxProvider} from "@/redux/provider";

export const metadata = {
    title: 'LoanManager',
    description: 'LoanManager helps you to control loans among your community.',
}

export default function RootLayout({children,}: {children: React.ReactNode }) {

    return (
        <html lang="en">
        <body>
        <ReduxProvider>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ReduxProvider>
        </body>
        </html>
    )
}

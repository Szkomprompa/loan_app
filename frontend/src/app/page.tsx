import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home() {

    return (
        <Container>

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
                        LoanManager
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        LoanManager helps you to control loans among your community.
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Link href={'loans/lent-loans'} >
                            <Button variant="contained" color="primary">Get started</Button>
                        </Link>
                    </Stack>
                </Container>
            </Box>
        </Container>
    );
};

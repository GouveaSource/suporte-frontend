import { Container, Typography } from "@mui/material";


export default function DashboardPage() {
    return (
        <Container>
            <Typography 
                variant="h4"
                component="h1"
                sx= {{ mt: 4 }}
                >
                Dashboard
            </Typography>
        </Container>
    )
}
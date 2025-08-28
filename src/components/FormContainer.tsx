"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";

interface FormContainerProps {
    title: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ title, onSubmit, children }) => {
    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {title}

                    {children}
                </Typography>
            </Box>
        </Container>
    );
};

export default FormContainer;
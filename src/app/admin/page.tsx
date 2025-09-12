'use client';

import { Container, Typography } from '@mui/material';

export default function AdminDashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Administrativo
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Bem-vindo ao painel de controle. Utilize o menu lateral para gerenciar
        os recursos do sistema.
      </Typography>
    </Container>
  );
}

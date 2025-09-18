'use client';

import Link from 'next/link';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
} from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const menuItems = [
  {
    title: 'Pátios',
    description: 'Consulte contatos e endereços dos pátios.',
    href: '/dashboard/patios',
    icon: <ApartmentIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Setores',
    description: 'Consulte contatos e ramais dos setores internos.',
    href: '/dashboard/setores',
    icon: <BusinessCenterIcon sx={{ fontSize: 40 }} />,
  },
  // Adicione mais cards de menu aqui no futuro
];

export default function DashboardPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Acesso Rápido
      </Typography>
    </Container>
  );
}

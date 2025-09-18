'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardNav from '@/components/DashboardNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading, signOut, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Portal de Suporte
          </Typography>
          <Typography sx={{ mr: 2 }}>Olá, {user?.name}!</Typography>
          <IconButton color="inherit" onClick={signOut} aria-label="Sair">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px' }}>
        <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
          <DashboardNav />
          <Box sx={{ p: 3 }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  ) : null;
}

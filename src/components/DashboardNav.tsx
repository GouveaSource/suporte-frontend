'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const menuItems = [
  { text: 'Pátios', href: '/dashboard/patios', icon: <ApartmentIcon /> },
  { text: 'Setores', href: '/dashboard/setores', icon: <BusinessCenterIcon /> },
];

export default function DashboardNav() {
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        backgroundColor: '#f5f5f5',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar>
        <Box>
          {menuItems.map((item) => (
            <Button
              key={item.text}
              component={Link}
              href={item.href}
              startIcon={item.icon}
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                mr: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

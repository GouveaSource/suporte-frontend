'use client';

import React, { useState } from 'react';
import { usePatios } from '@/hooks/usePatios';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  IconButton,
  Tooltip,
  Snackbar,
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DataGridComponent from '@/components/DataGrid';

export default function PatiosDisplayPage() {
  const { patios, loading, error } = usePatios();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const handleCopy = (text: string, subject: string) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: `${subject} copiado(a)!` });
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Pátio', flex: 1.5 },
    { field: 'phone', headerName: 'Telefone', flex: 1 },
    { field: 'address', headerName: 'Endereço', flex: 2 },
    { field: 'managerName', headerName: 'Administrador', flex: 1 },
    {
      field: 'actions',
      headerName: 'Copiar',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title="Copiar Telefone">
          <IconButton onClick={() => handleCopy(params.row.phone, 'Telefone')}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  if (loading)
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom>
        Pátios
      </Typography>

      <DataGridComponent rows={patios} columns={columns} loading={loading} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}

'use client';

import React, { useState } from 'react';
import { useSetores } from '@/hooks/useSetores';
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

export default function SetoresDisplayPage() {
  const { setores, loading, error } = useSetores();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const handleCopy = (text: string, subject: string) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: `${subject} copiado(a)!` });
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Setor', flex: 1.5 },
    { field: 'phone', headerName: 'Contato', flex: 1 },
    {
      field: 'ramal',
      headerName: 'Ramal',
      flex: 0.5,
      valueGetter: (value) => value || 'N/A',
    },
    {
      field: 'responsible',
      headerName: 'Responsável',
      flex: 1,
      valueGetter: (value) => value || 'N/A',
    },
    {
      field: 'actions',
      headerName: 'Copiar',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title="Copiar Contato">
          <IconButton onClick={() => handleCopy(params.row.phone, 'Contato')}>
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
        Setores Internos
      </Typography>

      <DataGridComponent rows={setores} columns={columns} loading={loading} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}

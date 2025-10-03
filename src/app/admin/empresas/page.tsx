'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAuth } from '@/contexts/AuthContext';
import { Empresa, FormData } from '@/types/empresa';
import {
  buscaEmpresas,
  criaEmpresa,
  atualizaEmpresa,
  deletaEmpresa,
} from '@/services/empresaService';

export default function EmpresasPage() {
  const { user } = useAuth();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '' });

  const canCreate = user?.permissions.some((p) => p.name === 'empresa:create');
  const canUpdate = user?.permissions.some((p) => p.name === 'empresa:update');
  const canDelete = user?.permissions.some((p) => p.name === 'empresa:delete');

  const loadEmpresas = async () => {
    try {
      setLoading(true);
      const data = await buscaEmpresas();
      setEmpresas(data);
    } catch (err) {
      setError('Erro ao carregar a lista de empresas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmpresas();
  }, []);

  const handleOpenModal = (empresa: Empresa | null) => {
    setEditingEmpresa(empresa);
    setFormData(empresa ? { name: empresa.name } : { name: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmpresa(null);
    setFormData({ name: '' });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (editingEmpresa) {
        await atualizaEmpresa(editingEmpresa.id, formData);
      } else {
        await criaEmpresa(formData);
      }
      handleCloseModal();
      loadEmpresas(); // Recarrega a lista
    } catch (err) {
      setError('Erro ao salvar a empresa. Verifique se o nome já existe.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      try {
        await deletaEmpresa(id);
        loadEmpresas(); // Recarrega a lista
      } catch (err) {
        setError('Erro ao excluir a empresa.');
      }
    }
  };
  
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome da Empresa', flex: 1 },
    {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          {canUpdate && (
            <Tooltip title="Editar">
              <IconButton onClick={() => handleOpenModal(params.row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {canDelete && (
            <Tooltip title="Excluir">
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Gerenciamento de Empresas
        </Typography>
        {canCreate && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal(null)}
          >
            Nova Empresa
          </Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ height: '70vh', width: '100%' }}>
        <DataGrid rows={empresas} columns={columns} loading={loading} />
      </Box>

      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingEmpresa ? 'Editar Empresa' : 'Cadastrar Nova Empresa'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Nome da Empresa"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingEmpresa ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}
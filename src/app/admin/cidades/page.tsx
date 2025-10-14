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
import { Cidade, FormData } from '@/types/cidade';
import {
  buscaCidades,
  criaCidade,
  atualizaCidade,
  deletaCidade,
} from '@/services/cidadeService';

export default function CidadesPage() {
  const { user } = useAuth();
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCidade, setEditingCidade] = useState<Cidade | null>(null);
  const [formData, setFormData] = useState<FormData>({ nome: '', estado: '' });

  const canCreate = user?.permissions.some((p) => p.name === 'cidade:create');
  const canUpdate = user?.permissions.some((p) => p.name === 'cidade:update');
  const canDelete = user?.permissions.some((p) => p.name === 'cidade:delete');

  const loadCidades = async () => {
    try {
      setLoading(true);
      const data = await buscaCidades();
      setCidades(data);
    } catch (err) {
      setError('Erro ao carregar a lista de cidades.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCidades();
  }, []);

  const handleOpenModal = (cidade: Cidade | null) => {
    setEditingCidade(cidade);
    setFormData(cidade ? { nome: cidade.nome, estado: cidade.estado } : { nome: '', estado: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCidade(null);
    setFormData({ nome: '', estado: '' });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (editingCidade) {
        await atualizaCidade(editingCidade.id, formData);
      } else {
        await criaCidade(formData);
      }
      handleCloseModal();
      loadCidades();
    } catch (err) {
      setError('Erro ao salvar a cidade.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta cidade?')) {
      try {
        await deletaCidade(id);
        loadCidades();
      } catch (err) {
        setError('Erro ao excluir a cidade.');
      }
    }
  };
  
  const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome da Cidade', flex: 1 },
    { field: 'estado', headerName: 'Estado', width: 150 },
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
          Gerenciamento de Cidades
        </Typography>
        {canCreate && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal(null)}
          >
            Nova Cidade
          </Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ height: '70vh', width: '100%' }}>
        <DataGrid rows={cidades} columns={columns} loading={loading} />
      </Box>

      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingCidade ? 'Editar Cidade' : 'Cadastrar Nova Cidade'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="nome"
              label="Nome da Cidade"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              name="estado"
              label="Estado (UF)"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              required
              inputProps={{ maxLength: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingCidade ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}
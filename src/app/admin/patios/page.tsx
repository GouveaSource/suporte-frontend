'use client';

import { useState } from 'react';
import { usePatiosPage } from '@/hooks/usePatiosPage';
import {
  Button,
  Alert,
  Box,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import InputField from '@/components/InputField';
import DataGridComponent from '@/components/DataGrid';

export default function PatiosPage() {
  const {
    isModalOpen,
    editingPatio,
    formData,
    successMessage,
    errorMessage,
    patios,
    error,
    loading,
    handleChange,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleDeletePatio,
    setSuccessMessage,
    setErrorMessage,
    reload,
  } = usePatiosPage();

  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set<GridRowId>(),
  });

  const selectedIds = Array.from(selectionModel.ids);

  const handleDeleteSelected = async () => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir ${selectedIds.length} pátio(s) selecionado(s)?`,
      )
    ) {
      try {
        await Promise.all(
          selectedIds.map((id) => handleDeletePatio(id as string)),
        );
        setSuccessMessage(
          `${selectedIds.length} pátio(s) excluído(s) com sucesso!`,
        );
        setSelectionModel({ type: 'include', ids: new Set() }); // limpa a seleção
        reload();
      } catch {
        setErrorMessage('Ocorreu um erro ao excluir os pátios.');
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Pátio', flex: 1.5 },
    { field: 'phone', headerName: 'Contato', flex: 1 },
    {
      field: 'managerName',
      headerName: 'Responsável',
      flex: 1,
      valueGetter: (value) => value || 'N/A',
    },
    {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      filterable: false,
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title="Editar">
          <IconButton onClick={() => handleOpenModal(params.row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Container component="main" maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography component="h1" variant="h4">
          Gerenciamento de Pátios
        </Typography>
        <Box>
          {selectedIds.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteSelected}
              sx={{ mr: 2 }}
            >
              Excluir ({selectedIds.length})
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal(null)}
          >
            Novo Pátio
          </Button>
        </Box>
      </Box>

      {successMessage && (
        <Alert
          severity="success"
          onClose={() => setSuccessMessage(null)}
          sx={{ mb: 2 }}
        >
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert
          severity="error"
          onClose={() => setErrorMessage(null)}
          sx={{ mb: 2 }}
        >
          {errorMessage || error}
        </Alert>
      )}

      <DataGridComponent
        rows={patios}
        columns={columns}
        loading={loading}
        checkboxSelection
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={(newSelection) =>
          setSelectionModel({ type: 'include', ids: new Set(newSelection.ids) })
        }
      />

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingPatio ? 'Editar Pátio' : 'Cadastrar Novo Pátio'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <InputField
              name="name"
              label="Nome do Pátio"
              value={formData.name}
              onChange={handleChange}
              required
              autoFocus
            />
            <InputField
              name="address"
              label="Endereço"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <InputField
              name="cep"
              label="CEP"
              value={formData.cep}
              onChange={handleChange}
              required
            />
             <InputField
              name="referencePoint"
              label="Ponto de Referência"
              value={formData.referencePoint || ''}
              onChange={handleChange}
            />
             <InputField
              name="mapUrl"
              label="URL do Mapa"
              value={formData.mapUrl}
              onChange={handleChange}
              required
            />
            <InputField
              name="phone"
              label="Telefone / Whatsapp"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <InputField
              name="ramal"
              label="Ramal"
              value={formData.ramal || ''}
              onChange={handleChange}
            />
            <InputField
              name="managerName"
              label="Nome do Responsável"
              value={formData.managerName || ''}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions sx={{ p: '16px 24px' }}>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingPatio ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}
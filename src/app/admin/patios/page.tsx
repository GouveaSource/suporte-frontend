'use client';

import { usePatiosPage } from '@/hooks/usePatiosPage';
import { Patio } from '@/types/patio';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InputField from '@/components/InputField';
import GenericTable, { ColumnDef } from '@/components/GenericTable';

export default function PatiosPage() {
  const {
    isModalOpen,
    editingPatio,
    formData,
    successMessage,
    errorMessage,
    patios,
    error,
    handleChange,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleDeletePatio,
    setSuccessMessage,
    setErrorMessage,
  } = usePatiosPage();

  const columns: ColumnDef<Patio>[] = [
    { header: 'Nome', accessor: (p) => p.name },
    { header: 'Telefone', accessor: (p) => p.phone },
    { header: 'Ramal', accessor: (p) => p.ramal || 'N/A' },
    { header: 'Administrador', accessor: (p) => p.managerName },
    { header: 'Endereço', accessor: (p) => p.address || 'N/A' },
    { header: 'CEP', accessor: (p) => p.cep || 'N/A' },
    { header: 'Referência', accessor: (p) => p.referencePoint || 'N/A' },
    { header: 'URL do Mapa', accessor: (p) => p.mapUrl },
  ];

  const currentData = formData;

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal(null)}
        >
          Novo Pátio
        </Button>
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
      {(errorMessage || error) && (
        <Alert
          severity="error"
          onClose={() => {
            setErrorMessage(null);
          }}
          sx={{ mb: 2 }}
        >
          {errorMessage || error}
        </Alert>
      )}

      <GenericTable
        data={patios}
        columns={columns}
        onEdit={(patio) => handleOpenModal(patio)}
        onDelete={handleDeletePatio}
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
              value={currentData.name}
              onChange={handleChange}
              required
              autoFocus
            />
            <InputField
              name="address"
              label="Endereço"
              value={currentData.address}
              onChange={handleChange}
              required
            />
            <InputField
              name="cep"
              label="CEP"
              value={currentData.cep}
              onChange={handleChange}
              required
            />
            <InputField
              name="phone"
              label="Telefone"
              value={currentData.phone}
              onChange={handleChange}
              required
            />
            <InputField
              name="ramal"
              label="Ramal"
              value={currentData.ramal || ''}
              onChange={handleChange}
            />
            <InputField
              name="referencePoint"
              label="Referência"
              value={currentData.referencePoint || ''}
              onChange={handleChange}
            />
            <InputField
              name="mapUrl"
              label="URL do Mapa"
              value={currentData.mapUrl}
              onChange={handleChange}
              required
            />
            <InputField
              name="managerName"
              label="Nome do Administrador"
              value={currentData.managerName}
              onChange={handleChange}
              required
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

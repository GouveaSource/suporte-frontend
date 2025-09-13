'use client';

import { useSetoresPage } from '@/hooks/useSetoresPage';
import { Setor } from '@/types/setor';

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

export default function SetoresPage() {
  const {
    isModalOpen,
    editingSetor,
    formData,
    successMessage,
    errorMessage,
    setores,
    error,
    handleChange,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleDeleteSetor,
    setSuccessMessage,
    setErrorMessage,
  } = useSetoresPage();

  // Define as colunas para tabela genérica
  const columns: ColumnDef<Setor>[] = [
    { header: 'Setor', accessor: (s) => s.name },
    { header: 'Contato', accessor: (s) => s.phone },
    { header: 'Ramal', accessor: (s) => s.ramal || 'N/A' },
    { header: 'Responsável', accessor: (s) => s.responsible || 'N/A' },
  ];

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
          Gerenciamento de Setores
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal(null)}
        >
          Novo
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
          onClose={() => setErrorMessage(null)}
          sx={{ mb: 2 }}
        >
          {errorMessage || error}
        </Alert>
      )}

      <GenericTable
        data={setores}
        columns={columns}
        onEdit={(setor) => handleOpenModal(setor)}
        onDelete={handleDeleteSetor}
      />

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingSetor ? 'Editar Setor' : 'Cadastrar Novo Setor'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <InputField
              name="name"
              label="Nome do Setor"
              value={formData.name}
              onChange={handleChange}
              required
              autoFocus
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
              name="responsible"
              label="Nome do Responsável"
              value={formData.responsible || ''}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions sx={{ p: '16px 24px' }}>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingSetor ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

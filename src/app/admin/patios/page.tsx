"use client";

import React, { useState, useEffect } from "react";
import api from "@/services/api";

// Imports do MUI
import {
  Button,
  Alert,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
// Imports dos Ícones
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Nossos componentes
import InputField from "@/components/InputField";
import FormContainer from "@/components/FormContainer";

// Interfaces
interface FormData {
  name: string;
  address: string;
  cep: string;
  managerName: string;
}

interface Patio {
  id: string;
  name: string;
  address: string;
  cep: string;
  managerName: string | null;
}

export default function PatiosPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    cep: "",
    managerName: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [patios, setPatios] = useState<Patio[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatio, setEditingPatio] = useState<Patio | null>(null);

  const fetchPatios = async () => {
    try {
      const response = await api.get("/patios");
      setPatios(response.data);
    } catch (error) {
      console.error("Erro ao buscar pátios:", error);
    }
  };

  useEffect(() => {
    fetchPatios();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await api.post("/patios", formData);
      if (response.status === 201) {
        setSuccessMessage(`Pátio "${response.data.name}" criado com sucesso!`);
        setFormData({ name: "", address: "", cep: "", managerName: "" });
        fetchPatios();
      }
    } catch (error) {
      setErrorMessage(
        "Erro ao criar o pátio. Verifique os dados e tente novamente."
      );
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  const handleDelete = async (patioId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este pátio?")) {
      try {
        await api.delete(`/patios/${patioId}`);
        setSuccessMessage("Pátio excluído com sucesso!");
        setTimeout(() => setSuccessMessage(null), 3000);
        fetchPatios();
      } catch (error) {
        setErrorMessage("Erro ao excluir o pátio.");
        setTimeout(() => setErrorMessage(null), 3000);
        console.error("Erro ao excluir:", error);
      }
    }
  };

  const handleEditClick = (patio: Patio) => {
    setEditingPatio(patio);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPatio(null);
  };

  const handleUpdateSubmit = async () => {
    if (!editingPatio) return;
    try {
      await api.put(`/patios/${editingPatio.id}`, {
        name: editingPatio.name,
        address: editingPatio.address,
        cep: editingPatio.cep,
        managerName: editingPatio.managerName,
      });
      setSuccessMessage("Pátio atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(null), 3000);
      handleModalClose();
      fetchPatios();
    } catch (error) {
      setErrorMessage("Erro ao atualizar o pátio.");
      setTimeout(() => setErrorMessage(null), 3000);
      console.error("Erro ao atualizar:", error);
    }
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editingPatio) {
      setEditingPatio({
        ...editingPatio,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <FormContainer title="Cadastrar Novo Pátio" onSubmit={handleSubmit}>
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
          name="managerName"
          label="Nome do Administrador (Opcional)"
          value={formData.managerName}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Cadastrar
        </Button>
      </FormContainer>

      <Box sx={{ width: "100%", maxWidth: "sm", margin: "auto", mt: 2 }}>
        {successMessage && (
          <Alert severity="success" onClose={() => setSuccessMessage(null)}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        )}
      </Box>

      <Box sx={{ width: "100%", mt: 8, mb: 4 }}>
        <Typography component="h2" variant="h5" align="center" gutterBottom>
          Pátios Cadastrados
        </Typography>
        <List
          sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}
        >
          {patios.map((patio, index) => (
            <React.Fragment key={patio.id}>
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditClick(patio)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(patio.id)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={patio.name}
                  secondary={`Admin: ${patio.managerName || "Não informado"}`}
                />
              </ListItem>
              {index < patios.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Editar Pátio</DialogTitle>
        <DialogContent>
          {editingPatio && (
            <Box component="div" sx={{ pt: 2 }}>
              <InputField
                name="name"
                label="Nome do Pátio"
                value={editingPatio.name}
                onChange={handleEditChange}
                required
              />
              <InputField
                name="address"
                label="Endereço"
                value={editingPatio.address}
                onChange={handleEditChange}
                required
              />
              <InputField
                name="cep"
                label="CEP"
                value={editingPatio.cep}
                onChange={handleEditChange}
                required
              />
              <InputField
                name="managerName"
                label="Nome do Administrador"
                value={editingPatio.managerName || ""}
                onChange={handleEditChange}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: "16px 24px" }}>
          <Button onClick={handleModalClose}>Cancelar</Button>
          <Button onClick={handleUpdateSubmit} variant="contained">
            Salvar Alterações
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

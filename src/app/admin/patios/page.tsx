"use client";

import React, { useState, useEffect } from "react";
import api from "@/services/api";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InputField from "@/components/InputField";
import GenericTable, { ColumnDef } from "@/components/GenericTable";

// Interface atualizada com todos os campos do backend
interface Patio {
  id: string;
  name: string;
  address: string;
  cep: string;
  referencePoint: string | null;
  mapUrl: string | null;
  phone: string;
  ramal: string | null;
  managerName: string | null;
}

// O FormData pode ser um Partial<Patio> para facilitar
type FormData = Omit<Patio, "id">;

const initialFormData: FormData = {
  name: "",
  address: "",
  cep: "",
  referencePoint: "",
  mapUrl: "",
  phone: "",
  ramal: "",
  managerName: "",
};

export default function PatiosPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
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
      setErrorMessage("Erro ao carregar a lista de pátios.");
    }
  };

  useEffect(() => {
    fetchPatios();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editingPatio) {
      setEditingPatio({ ...editingPatio, [name]: value });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOpenModal = (patio: Patio | null) => {
    setEditingPatio(patio);
    if (patio) {
      // Preenche o formulário com os dados do pátio para edição
      setFormData({
        name: patio.name || "",
        address: patio.address || "",
        cep: patio.cep || "",
        referencePoint: patio.referencePoint || "",
        mapUrl: patio.mapUrl || "",
        phone: patio.phone || "",
        ramal: patio.ramal || "",
        managerName: patio.managerName || "",
      });
    } else {
      // Limpa o formulário para um novo cadastro
      setFormData(initialFormData);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPatio(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const dataToSubmit = editingPatio ? { ...editingPatio, ...formData } : formData;
    const url = editingPatio ? `/patios/${editingPatio.id}` : "/patios";
    const method = editingPatio ? "put" : "post";

    try {
      const response = await api[method](url, dataToSubmit);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(
          `Pátio "${response.data.name}" ${
            editingPatio ? "atualizado" : "criado"
          } com sucesso!`
        );
        handleCloseModal();
        fetchPatios();
      }
    } catch (error) {
      setErrorMessage(
        `Erro ao ${
          editingPatio ? "atualizar" : "criar"
        } o pátio. Verifique os dados.`
      );
      console.error("Erro no formulário:", error);
    }
  };

  const handleDelete = async (patioId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este pátio?")) {
      try {
        await api.delete(`/patios/${patioId}`);
        setSuccessMessage("Pátio excluído com sucesso!");
        fetchPatios();
      } catch (error) {
        setErrorMessage("Erro ao excluir o pátio.");
        console.error("Erro ao excluir:", error);
      }
    }
  };

  // Colunas atualizadas para a tabela
  const columns: ColumnDef<Patio>[] = [
    { header: "Nome", accessor: (p) => p.name },
    { header: "Telefone", accessor: (p) => p.phone},
    { header: "Ramal", accessor: (p) => p.ramal || "N/A" },
    { header: "Administrador", accessor: (p) => p.managerName || "N/A" },
    { header: "Endereço", accessor: (p) => p.address || "N/A" },
    { header: "CEP", accessor: (p) => p.cep || "N/A" },
    { header: "Ponto de Referência", accessor: (p) => p.referencePoint || "N/A" },
    { header: "URL do Mapa", accessor: (p) => p.mapUrl || "N/A" },
  ];

  const currentData = editingPatio ?? formData;

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
        <Alert severity="success" onClose={() => setSuccessMessage(null)} sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage(null)} sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <GenericTable
        data={patios}
        columns={columns}
        onEdit={(patio) => handleOpenModal(patio)}
        onDelete={handleDelete}
      />

      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>{editingPatio ? "Editar Pátio" : "Cadastrar Novo Pátio"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <InputField name="name" label="Nome do Pátio" value={currentData.name} onChange={handleChange} required autoFocus />
            <InputField name="address" label="Endereço" value={currentData.address} onChange={handleChange} required />
            <InputField name="cep" label="CEP" value={currentData.cep} onChange={handleChange} required />
            <InputField name="phone" label="Telefone" value={currentData.phone} onChange={handleChange} required/>
            <InputField name="ramal" label="Ramal" value={currentData.ramal || ""} onChange={handleChange} />
            <InputField name="referencePoint" label="Ponto de Referência" value={currentData.referencePoint || ""} onChange={handleChange} />
            <InputField name="mapUrl" label="URL do Mapa" value={currentData.mapUrl || ""} onChange={handleChange} />
            <InputField name="managerName" label="Nome do Administrador" value={currentData.managerName || ""} onChange={handleChange} />
          </DialogContent>
          <DialogActions sx={{ p: "16px 24px" }}>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingPatio ? "Salvar Alterações" : "Cadastrar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import api from "../../services/api";

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
} from "@mui/material";
import InputField from "../../components/InputField";
import FormContainer from "../../components/FormContainer";

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

  const fetchPatios = async () => {
    try {
      const response = await api.get("/patios");
      setPatios(response.data);
    } catch (error) {
      console.error("Erro ao buscar pátios:", error);
      // Poderíamos setar uma mensagem de erro para a lista aqui
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
        fetchPatios(); // Atualiza a lista!
      }
    } catch (error) {
      setErrorMessage(
        "Erro ao criar o pátio. Verifique os dados e tente novamente."
      );
      console.error("Erro ao enviar o formulário:", error);
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

        {successMessage && (
          <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {errorMessage}
          </Alert>
        )}
      </FormContainer>

      <Box sx={{ width: "100%", mt: 8, mb: 4 }}>
        <Typography component="h2" variant="h5" align="center" gutterBottom>
          Pátios Cadastrados
        </Typography>
        <List sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
          {patios.map((patio, index) => (
            <React.Fragment key={patio.id}>
              <ListItem>
                <ListItemText
                  primary={patio.name}
                  secondary={`Admin: ${patio.managerName || "Não informado"}`}
                />
              </ListItem>
              {index < patios.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
}

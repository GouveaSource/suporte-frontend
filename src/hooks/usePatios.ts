import { useState, useEffect } from 'react';
import { Patio, FormData } from '@/types/patio';
import {
  fetchPatios,
  createPatio,
  updatePatio,
  deletePatio,
} from '@/services/patiosService';

export function usePatios() {
  const [patios, setPatios] = useState<Patio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPatios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPatios();
      setPatios(data);
    } catch (err) {
      setError('Erro ao carregar a lista de pátios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatios();
  }, []);

  const handleCreate = async (data: FormData) => {
    setError(null);
    try {
      await createPatio(data);
      await loadPatios();
    } catch (err) {
      setError('Erro ao criar o pátio.');
    }
  };

  const handleUpdate = async (id: string, data: FormData) => {
    setError(null);
    try {
      await updatePatio(id, data);
      await loadPatios();
    } catch (err) {
      setError('Erro ao atualizar o pátio.');
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      await deletePatio(id);
      await loadPatios();
    } catch (err) {
      setError('Erro ao excluir o pátio.');
    }
  };

  return {
    patios,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
    reload: loadPatios,
  };
}

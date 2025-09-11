import api from './api';
import { Patio, FormData } from '@/types/patio';

export const fetchPatios = async (): Promise<Patio[]> => {
  const response = await api.get('/patios');
  return response.data;
};

export const createPatio = async (data: FormData): Promise<Patio> => {
  const response = await api.post('/patios', data);
  return response.data;
};

export const updatePatio = async (
  id: string,
  data: FormData,
): Promise<Patio> => {
  const response = await api.put(`/patios/${id}`, data);
  return response.data;
};

export const deletePatio = async (id: string): Promise<void> => {
  await api.delete(`/patios/${id}`);
};

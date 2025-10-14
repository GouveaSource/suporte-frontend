import api from './api';
import { Cidade, FormData } from '@/types/cidade';

export const buscaCidades = async (): Promise<Cidade[]> => {
    const response = await api.get('/cidades');
    return response.data;
};

export const criaCidade = async (data: FormData): Promise<Cidade> => {
    const response = await api.post('/cidades', data);
    return response.data;
};

export const atualizaCidade = async (
    id: string,
    data: FormData,
): Promise<Cidade> => {
    const response = await api.put(`/cidades/${id}`, data);
    return response.data;
};

export const deletaCidade = async (id: string): Promise<void> => {
    await api.delete(`/cidades/${id}`);
};
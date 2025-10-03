import api from './api';
import { Empresa, FormData } from '@/types/empresa';

export const buscaEmpresas = async (): Promise<Empresa[]> => {
    const response = await api.get('/empresas');
    return response.data;
};

export const criaEmpresa = async (data: FormData): Promise<Empresa> => {
    const response = await api.post('/empresas', data);
    return response.data;
};

export const atualizaEmpresa = async (
    id: string,
    data: FormData,
): Promise<Empresa> => {
    const response = await api.put(`/empresas/${id}`, data);
    return response.data;
};

export const deletaEmpresa = async (id: string): Promise<void> => {
    await api.delete(`/empresas/${id}`);
};
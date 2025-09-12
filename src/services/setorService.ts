import api from "./api";
import { Setor, FormData } from '../types/setor';

export const buscaSetores = async (): Promise<Setor[]> => {
    const response = await api.get('/setores')
    return response.data;
};

export const criaSetor = async (data: FormData): Promise<Setor> => {
    const response = await api.post('/setores', data);
    return response.data;
}

export const atualizaSetor = async (id: string, data: FormData): Promise<Setor> => {
    const response = await api.put(`/setores/${id}`, data);
    return response.data;
}

export const deletaSetor = async (id: string): Promise<void> => {
    await api.delete(`setores/${id}`);
}
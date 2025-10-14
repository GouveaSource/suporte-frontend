export interface Cidade {
    id: string;
    nome: string;
    estado: string;
}

export type FormData = Omit<Cidade, 'id'>;
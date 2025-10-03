export interface Empresa {
    id: string;
    name: string;
}

export type FormData = Omit<Empresa, 'id'>;
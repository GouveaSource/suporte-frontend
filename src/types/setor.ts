export interface Setor {
    id: string;
    name: string;
    phone: string;
    ramal: string | null;
    responsible: string | null;
}
export type FormData = Omit<Setor, 'id'>;
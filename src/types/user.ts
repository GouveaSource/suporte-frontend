export interface Permission {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string | null;
    email: string;
    permissions: Permission[];
    empresaId?: string;
}
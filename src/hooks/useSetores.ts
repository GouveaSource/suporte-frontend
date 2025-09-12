// suporte-frontend/src/hooks/useSetores.ts

import { useState, useEffect } from 'react';
import { Setor, FormData } from '../types/setor';
import {
    buscaSetores,
    criaSetor,
    atualizaSetor,
    deletaSetor,
} from '@/services/setorService';

export function useSetores() {
    const [setores, setSetores] = useState<Setor[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadSetores = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await buscaSetores();
            setSetores(data);
        } catch (err) {
            setError('Erro ao carregar a lista de setores.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSetores();
    }, []);

    const handleCreate = async (data: FormData) => {
        await criaSetor(data);
        await loadSetores();
    };

    const handleUpdate = async (id: string, data: FormData) => {
        await atualizaSetor(id, data);
        await loadSetores();
    };

    const handleDelete = async (id: string) => {
        await deletaSetor(id);
        await loadSetores();
    };

    return {
        setores,
        loading,
        error,
        handleCreate,
        handleUpdate,
        handleDelete,
        reload: loadSetores,
    };
}
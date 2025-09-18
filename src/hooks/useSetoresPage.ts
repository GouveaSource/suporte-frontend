import { useState } from 'react';
import { useSetores } from '@/hooks/useSetores';
import { Setor, FormData } from '@/types/setor';
import { phoneMask } from '@/utils/maskUtils';

const initialFormData: FormData = {
    name: '',
    phone: '',
    ramal: '',
    responsible: '',
};

export function useSetoresPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSetor, setEditingSetor] = useState<Setor | null>(null);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { setores, loading, error, handleCreate, handleUpdate, handleDelete, reload } =
        useSetores();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'phone') {
            setFormData((prev) => ({ ...prev, [name]: phoneMask(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleOpenModal = (setor: Setor | null) => {
        setEditingSetor(setor);
        setFormData(
            setor
                ? {
                    name: setor.name,
                    phone: setor.phone,
                    ramal: setor.ramal || '',
                    responsible: setor.responsible || '',
                }
                : initialFormData,
        );
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSetor(null);
        setFormData(initialFormData);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);
        try {
            if (editingSetor) {
                await handleUpdate(editingSetor.id, formData);
                setSuccessMessage(`Setor "${formData.name}" atualizado com sucesso!`);
            } else {
                await handleCreate(formData);
                setSuccessMessage(`Setor "${formData.name}" criado com sucesso!`);
            }
            handleCloseModal();
        } catch {
            setErrorMessage(
                `Erro ao ${editingSetor ? 'atualizar' : 'criar'
                } o setor. Verifique os dados.`,
            );
        }
    };

    const handleDeleteSetor = async (setorId: string) => {
        if (window.confirm('Tem certeza que deseja excluir este setor?')) {
            try {
                await handleDelete(setorId);
                setSuccessMessage('Setor excluído com sucesso!');
            } catch {
                setErrorMessage('Erro ao excluir o setor.');
            }
        }
    };

    return {
        isModalOpen,
        editingSetor,
        formData,
        successMessage,
        errorMessage,
        setores,
        error,
        loading,
        handleChange,
        handleOpenModal,
        handleCloseModal,
        handleSubmit,
        handleDeleteSetor,
        reload,
        setSuccessMessage,
        setErrorMessage,
    };
}
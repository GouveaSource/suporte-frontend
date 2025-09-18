import { useState } from 'react';
import { usePatios } from '@/hooks/usePatios';
import { Patio, FormData } from '@/types/patio';
import { cepMask, phoneMask } from '@/utils/maskUtils';

const { patios, loading, error, handleCreate, handleUpdate, handleDelete, reload } = usePatios();

const initialFormData: FormData = {
  name: '',
  address: '',
  cep: '',
  referencePoint: '',
  mapUrl: '',
  phone: '',
  ramal: '',
  managerName: '',
};

export function usePatiosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatio, setEditingPatio] = useState<Patio | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { patios, error, handleCreate, handleUpdate, handleDelete, reload } =
    usePatios();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let maskedValue = value;

    if (name === 'cep') {
      maskedValue = cepMask(value);
    } else if (name === 'phone') {
      maskedValue = phoneMask(value);
    }

    setFormData((prev) => ({ ...prev, [name]: maskedValue }));
  };

  const handleOpenModal = (patio: Patio | null) => {
    setEditingPatio(patio);
    if (patio) {
      setFormData({
        name: patio.name || '',
        address: patio.address || '',
        cep: patio.cep || '',
        referencePoint: patio.referencePoint || '',
        mapUrl: patio.mapUrl || '',
        phone: patio.phone || '',
        ramal: patio.ramal || '',
        managerName: patio.managerName || '',
      });
    } else {
      setFormData(initialFormData);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPatio(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      if (editingPatio) {
        await handleUpdate(editingPatio.id, formData);
        setSuccessMessage(`Pátio "${formData.name}" atualizado com sucesso!`);
      } else {
        await handleCreate(formData);
        setSuccessMessage(`Pátio "${formData.name}" criado com sucesso!`);
      }
      handleCloseModal();
      reload();
    } catch {
      setErrorMessage(
        `Erro ao ${editingPatio ? 'atualizar' : 'criar'} o pátio. Verifique os dados.`,
      );
    }
  };

  const handleDeletePatio = async (patioId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pátio?')) {
      try {
        await handleDelete(patioId);
        setSuccessMessage('Pátio excluído com sucesso!');
        reload();
      } catch {
        setErrorMessage('Erro ao excluir o pátio.');
      }
    }
  };

  return {
    isModalOpen,
    editingPatio,
    formData,
    successMessage,
    errorMessage,
    patios,
    error,
    loading,
    handleChange,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleDeletePatio,
    reload,
    setSuccessMessage,
    setErrorMessage,
  };
}

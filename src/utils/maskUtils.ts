// Máscara para CEP: 99999-999
export const cepMask = (value: string): string => {
    if (!value) return '';
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca hífen entre o quinto e o sexto dígitos
    return value.substring(0, 9); // Garante que o tamanho máximo seja 9
};

// Máscara para Telefone: (99) 99999-9999
export const phoneMask = (value: string): string => {
    if (!value) return '';
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/(\d{2})(\d)/, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca hífen depois do nono dígito (para celulares)
    return value.substring(0, 15); // Garante o tamanho máximo
};

// Máscara para CPF: 999.999.999-99
export const cpfMask = (value: string): string => {
    if (!value) return '';
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // De novo, para o segundo bloco de 3
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen antes dos últimos 2 dígitos
    return value.substring(0, 14); // Garante o tamanho máximo
};
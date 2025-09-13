
import api from './api';

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
    user: {
        id: string;
        name: string | null;
        email: string;
        role: 'ADMIN' | 'USER';
    };
}

export const signIn = async (credentials: SignInCredentials): Promise<SignInResponse> => {
    const response = await api.post<SignInResponse>('/login', credentials);
    return response.data;
};
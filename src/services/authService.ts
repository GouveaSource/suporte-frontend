import api from './api';

interface User {
    id: string;
    name: string | null;
    email: string;
    role: 'ADMIN' | 'USER';
}

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
    user: User;
}

export const signIn = async (
    credentials: SignInCredentials,
): Promise<SignInResponse> => {
    const response = await api.post<SignInResponse>('/login', credentials);
    return response.data;
};


export interface SignUpCredentials {
    name: string;
    email: string;
    password: string;
}

export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
    const response = await api.post<User>('/users', credentials);
    return response.data;
};
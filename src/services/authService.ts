import api from './api';
import { User } from '@/types/user'

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
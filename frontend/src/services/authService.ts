import axios, {AxiosResponse} from "axios";
import {
    AuthResponse,
    AuthResponseWithRecoveryToken,
    LoginRequest,
    RecoverPasswordRequest,
    RegisterRequest
} from "@/types/user/userTypes";

const API_BASE_URL = 'https://localhost:8443/api/auth';

export const register = async (registerRequest: RegisterRequest): Promise<AuthResponseWithRecoveryToken> => {
    try {
        const response: AxiosResponse<AuthResponseWithRecoveryToken> = await axios.post(`${API_BASE_URL}/register`, registerRequest);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const login = async (loginRequest: LoginRequest): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(`${API_BASE_URL}/login`, loginRequest);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const recoverPassword = async (recoverPasswordRequest: RecoverPasswordRequest): Promise<AuthResponseWithRecoveryToken> => {
    try {
        const response: AxiosResponse<AuthResponseWithRecoveryToken> = await axios.post(`${API_BASE_URL}/recover-password`, recoverPasswordRequest);
        return response.data;
    } catch (error) {
        throw error;
    }
}
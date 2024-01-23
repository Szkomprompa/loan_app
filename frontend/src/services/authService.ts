import axios, {AxiosResponse} from "axios";
import {AuthResponse, LoginRequest, RegisterRequest} from "@/types/user/userTypes";

const API_BASE_URL = 'http://localhost:8080/api/auth';

export const register = async (registerRequest: RegisterRequest): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(`${API_BASE_URL}/register`, registerRequest);
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
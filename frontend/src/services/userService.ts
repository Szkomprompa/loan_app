import axios, {AxiosResponse} from "axios";
import {ChangePasswordRequest} from "@/types/user/userTypes";

const API_BASE_URL = 'https://localhost:8443/api/users';

export const changePassword = async (changePasswordRequest: ChangePasswordRequest, token: string | null): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.patch(API_BASE_URL, changePasswordRequest, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getRecoveryToken = async (token: string | null): Promise<string> => {
    try {
        const response: AxiosResponse<any> = await axios.get(`${API_BASE_URL}/recovery-token`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

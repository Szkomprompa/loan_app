import axios, {AxiosResponse} from "axios";
import {ChangePasswordRequest} from "@/types/user/userTypes";

const API_BASE_URL = 'http://localhost:8080/api/users';

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
};

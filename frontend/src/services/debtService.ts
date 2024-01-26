import axios, {AxiosResponse} from "axios";
import {DebtDto} from "@/types/debt/debtDto";
import {LoanDto} from "@/types/loan/loanTypes";

const API_BASE_URL = 'https://localhost:8443/api/debt';

export const getDebts = async (token: string | null): Promise<DebtDto[]> => {
    try {
        const response: AxiosResponse<DebtDto[]> = await axios.get(API_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

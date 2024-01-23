import {LoanDto, LoanRequest} from "@/types/loan/loanTypes";
import axios, {AxiosResponse} from "axios";

const API_BASE_URL = 'http://localhost:8080/api/loan';

export const createLoan = async (loan: LoanRequest, token: string | null): Promise<LoanDto> => {
    try {
        const response: AxiosResponse<LoanDto> = await axios.post(API_BASE_URL, loan, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const replyToLoan = async (id: number, status: string, token: string | null): Promise<LoanDto> => {
    try {
        const response: AxiosResponse<LoanDto> = await axios.put(`${API_BASE_URL}/${id}/reply?status=${status}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBorrowedLoans = async (token: string | null): Promise<LoanDto[]> => {
    try {
        const response: AxiosResponse<LoanDto[]> = await axios.get(`${API_BASE_URL}/borrowed`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getLentLoans = async (token: string | null): Promise<LoanDto[]> => {
    try {
        const response: AxiosResponse<LoanDto[]> = await axios.get(`${API_BASE_URL}/lent`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getLoanById = async (id: number, token: string | null): Promise<LoanDto> => {
    try {
        const response: AxiosResponse<LoanDto> = await axios.get(`${API_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const repayLoan = async (id: number, token: string | null): Promise<LoanDto> => {
    try {
        const response: AxiosResponse<LoanDto> = await axios.get(`${API_BASE_URL}/${id}/repay`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

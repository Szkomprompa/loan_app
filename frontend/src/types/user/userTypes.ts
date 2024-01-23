type RegisterRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

type ChangePasswordRequest = {
    currentPassword: string;
    newPassword: string;
    confirmationPassword: string;
}

type LoginRequest = {
    email: string;
    password: string;
}

type AuthResponse = {
    token: string;
}


export type {RegisterRequest, LoginRequest, AuthResponse, ChangePasswordRequest};